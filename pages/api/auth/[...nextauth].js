import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        console.log(credentials.email);
        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email
        });

        if (!user) {
          client.close();
          throw new Error('No user found');
        }

        const isPasswordValid = await verifyPassword(
          credentials.password,
          user.password
        );

        console.log(isPasswordValid);

        if (!isPasswordValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();
        return { email: user.email };
      }
    })
  ]
});
