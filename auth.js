import connectMongo from '@/dbConnect/connectMongo';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
const login = async (credentials) => {
    try {
        await connectMongo();
        const user = await User.findOne({ email: credentials.email });
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
};

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: { email: {}, password: {} },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const { email, password } = credentials;
                try {
                    const user = await login({ email, password });
                    console.log({ user });
                    return user;
                } catch (error) {
                    throw new Error('Failed to login');
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
});
