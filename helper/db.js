import MongoClient from 'mongodb/lib/mongo_client';

import { hash, compare } from 'bcrypt';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://ecosapi22:K7TnPXqrmVR7MohA@db-auth.droxhmp.mongodb.net/auth?retryWrites=true&w=majority',
  );

  return client;
}

export async function hashPasswordHandler(password) {
  const hashPassword = await hash(password, 12);
  return hashPassword;
}

export async function verifyPasaword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);

  return isValid;
}

// ecosapi22
// K7TnPXqrmVR7MohA

// mongodb+srv://ecosapi22:<password>@db-auth.droxhmp.mongodb.net/?retryWrites=true&w=majority
