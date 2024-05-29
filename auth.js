import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from './lib/mongoClientPromise';
import { getBaseUrl, refreshToken } from './utils/utils';
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: { email: {}, password: {} },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const { email, password } = credentials;
                try {
                    const res = await fetch(`${getBaseUrl()}/api/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    if (res.status !== 200) {
                        return null;
                    }
                    const user = await res.json();
                    return { ...user, provider: 'credentials' };
                } catch (error) {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // authorization: {
            //     params: { access_type: 'offline', prompt: 'consent' },
            // },
            // profile(profile) {
            //     return {
            //         ...profile,
            //         provider: 'google',
            //     };
            // },
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            // profile(profile) {
            //     console.log(profile);
            //     return {
            //         ...profile,
            //         provider: 'google',
            //     };
            // },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user };

            if (token?.tokens?.expiresIn) {
                if (new Date().getTime() < token.tokens.expiresIn) {
                    return token;
                } else {
                    const newToken = await refreshToken(
                        token.tokens.refreshToken
                    );
                    return {
                        ...token,
                        tokens: {
                            ...token.tokens,
                            accessToken: newToken.tokens.accessToken,
                            expiresIn: newToken.tokens.expiresIn,
                        },
                    };
                }
            } else {
                return token;
            }
        },
        async session({ token, session }) {
            // console.log('session', token);
            // console.log(token.provider);
            session.user = token.user ?? token;
            session.tokens = token.tokens;
            // session.provider = token.provider;
            return session;
        },
    },
});
