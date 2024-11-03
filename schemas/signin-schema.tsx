import {z} from 'zod';

export const SignInSchema  = z.object({
    email: z.string({
        required_error: 'Email is required',
        message: 'Email is required'
    }).email('Invalid email'),
    password: z.string()
        .min(2, 'Minimum 6 characters')
        .max(32, 'Maximum 32 characters')
})
    