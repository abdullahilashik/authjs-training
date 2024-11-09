import {z} from 'zod';

export const CreateNewPostSchema = z.object({
    title: z.string(),
    description: z.string(),
    categories: z.any()
})