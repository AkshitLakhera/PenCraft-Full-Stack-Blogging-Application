import z from "zod";
export const signupInput = z.object({
    email:z.string().email(),
    password:z.string(),
    name:z.string().optional(),

})
export type SignupType =  z.infer<typeof signupInput>;
 export const siginInput = z.object({
    email:z.string().email(),
    password:z.string(),
 });
 export type SigninType = z.infer<typeof siginInput>;
  
 export const createPostInput = z.object({
    title:z.string(),
    content:z.string(),
 });

 export type CreatePostType =  z.infer<typeof createPostInput>

 export const updatePost = z.object({
    title:z.string().optional(),
    content:z.string().optional(),
 })
 export type UpdatePost = z.infer<typeof updatePost>