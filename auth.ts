import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import { SignInSchema } from './schemas/signin-schema';

interface User {
    id: string;
    name: string;
    email: string;
}

export const {auth, signIn, signOut, handlers} = NextAuth({
    providers: [     
        Github,   
        Credentials({            
            credentials: {
                email: {name: 'email', placeholder: 'Your email', label: 'Email', type: 'email', required: true},
                password: {name: 'password', placeholder: '******', label: 'Password', type: 'password', required: true}
            },
            async authorize (credentials) : Promise<any>{
                let user =  null;
                const parsedCredentials = SignInSchema.safeParse(credentials);
                if(!parsedCredentials.success){
                    // failed to get the safely pared inputs                    
                    return null;
                };
                user = {
                    id: 1,
                    name: 'ashik',
                    email: 'ashik@gmail.com'
                };                
                return user;
            }            
        }),        
    ],
    callbacks: {
        authorized({request: {nextUrl}, auth}){
            const isLoggedIn = !!auth?.user;
            const {pathname} = nextUrl;
            
            if(!isLoggedIn && !pathname.startsWith('/auth/signin')){
                return Response.redirect(new URL('/auth/signin', nextUrl));
            }
            if(isLoggedIn && pathname.startsWith('/auth/signin')){
                return Response.redirect(new URL('/', nextUrl));
            }
            return !!auth;
        },
        jwt({token, user}){
            if(user){
                token.id = user.id as string;
            }
            return token;
        },
        session({session, token}){
            // if(session){
            //     session.user.id = token.id;
            // }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin'
    }
})