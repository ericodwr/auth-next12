import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase, verifyPasaword } from '../../../helper/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPasaword(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          client.close();
          throw new Error('Password incorrect!');
        }

        client.close();
        return {
          email: user.email,
        };
      },
    }),
  ],
});
