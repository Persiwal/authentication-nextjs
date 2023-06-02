import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../lib/db';
import { hashPassword, verifyPassword } from '../../../lib/auth';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  console.log(req.body);
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const db = client.db();
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({
    email: userEmail
  });

  if (!user) {
    res.status(404).json({
      message: 'Did not found user'
    });
    client.close();
    return;
  }

  const isOldPasswordValid = await verifyPassword(oldPassword, user.password);

  if (!isOldPasswordValid) {
    res.status(422).json({
      message: 'The old password field is not correct!'
    });
    client.close();
    return;
  }

  if (!newPassword || newPassword.trim().lenght < 7) {
    res.status(422).json({
      message: 'Invalid input - new password must be at least 7 characters'
    });
    client.close();
    return;
  }

  const hashedNewPassword = await hashPassword(newPassword);

  const updatedUser = await usersCollection.updateOne(
    {
      email: userEmail
    },
    { $set: { password: hashedNewPassword } }
  );

  client.close();
  res.status(201).json({ message: 'Successfully changed password!' });
}

export default handler;
