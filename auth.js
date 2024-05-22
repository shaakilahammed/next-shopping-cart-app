import connectMongo from '@/dbConnect/connectMongo';
import User from '@/models/User';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from './lib/mongoClientPromise';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: 'jwt',
    },

    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: { email: {}, password: {} },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                try {
                    await connectMongo();
                    const user = await User.findOne({
                        email: credentials.email,
                    });
                    if (!user) throw new Error('Wrong Credentials');
                    const isCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isCorrect) throw new Error('Wrong Credentials');
                    return user;
                } catch (error) {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
    ],
});
