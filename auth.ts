import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import { SignInSchema } from './schemas/signin-schema';
import axios, { AxiosError } from 'axios';

interface User {
    id: number | any,
    fname: string | any,
    lname: string | any,
    email: string | any,
    phone: string | any,
    image_path: string | any,
    email_verified_at: string | any,
    created_at: string | any,
    updated_at: string | any,
    token: string | any,
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

                // auth start
                try {                    
                    const res : any = await axios.post('http://localhost:8000/api/login', parsedCredentials.data, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    const data = await res.data;                    
                    if(data.errors){
                        return null;
                    }
                    return data;
                  } catch (error : any) {                    
                    console.log('Error auth: ', error.response.data);
                    throw new Error(error.response.data.message || 'Failed to login');
                  }
                // auth ends                
            }            
        }),        
    ],
    callbacks: {
        authorized({request: {nextUrl}, auth}){
            const isLoggedIn = !!auth?.user;
            const {pathname} = nextUrl;
            
            
            if(!isLoggedIn && pathname.startsWith('/auth/')){
                return true;
            }            

            if(!isLoggedIn && !pathname.startsWith('/auth/signin') ){
                return Response.redirect(new URL('/auth/signin', nextUrl));
            }
            
            if(isLoggedIn && (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))){
                return Response.redirect(new URL('/', nextUrl));
            }
            return !!auth;
        },
        jwt({token, user}){
            if(user){
                token.id = user.id as string;
                token.name = user.name || (user.fname as string + ' ' + user.lname as string);
                token.token = user.token as string;
                token.phone = user.phone as string;
                token.image = user.image || user.image_path as string || null;
            }
            return token;
        },
        session({session, token}){
            if(session){
                session.user.token = token.token;
                session.user.phone = token.phone;
                session.user.image = token.image;
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin'
    }
})


/**
id: 2,
  fname: 'Test',
  lname: 'User',
  email: 'test@gmail.com',
  phone: '123456',
  image_path: null,
  email_verified_at: null,
  created_at: null,
  updated_at: null,
  token: '13|G2xajpjrG1bh71Gu9zqB6jbFOpzmSAab2W9uv5ltea10556e'
 */