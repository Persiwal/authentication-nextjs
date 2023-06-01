import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const connectionString =
    'mongodb+srv://mateuszbarwicki2:zoAnNxemn23ZsYLU@cluster0.eocsybf.mongodb.net';

  const client = await MongoClient.connect(connectionString);

  return client;
}
