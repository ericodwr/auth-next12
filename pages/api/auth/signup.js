import { connectToDatabase, hashPasswordHandler } from '../../../helper/db';

export default async function handler(req, res) {
  const data = req.body;
  const { method } = req;
  const { email, password } = data;

  if (method === 'POST') {
    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim('').length < 7
    ) {
      res.status(422).json({ message: 'Invalid input!' });
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      res.status(422).json({ message: 'User already exist!' });
      client.close();
      return;
    }

    const hashPassword = await hashPasswordHandler(password);

    const result = await db.collection('users').insertOne({
      email,
      password: hashPassword,
    });

    res.status(201).json({ message: 'User created!' });
    client.close();
  }
}
