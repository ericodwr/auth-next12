import { getSession } from 'next-auth/client';

import {
  connectToDatabase,
  hashPasswordHandler,
  verifyPasaword,
} from '../../../helper/db';
import { hash } from 'bcrypt';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'PATCH') {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const userEmail = session.user.email;
    const oldPassword = body.oldPassword;
    const newPassword = body.newPassword;

    const hashPassword = await hashPasswordHandler(newPassword, 12);

    const client = await connectToDatabase();

    const usersCollection = await client.db().collection('users');
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      res.status(404).json({ message: 'User not found!' });
      client.close();
      return;
    }

    const currentPassword = user.password;

    const passwordCheck = await verifyPasaword(oldPassword, currentPassword);

    if (!passwordCheck) {
      res.status(403).json({ message: 'Old password incorrect!' });
      client.close();
      return;
    }

    const result = await usersCollection.updateOne(
      {
        email: userEmail,
      },
      {
        $set: { password: hashPassword },
      },
    );
    client.close();
    res.status(200).json({ message: 'Password updated' });
  }
}
