"use client";

import BreadCrumb from "@/components/breadcrumb";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateNewPostSchema } from "@/schemas/post-create";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TinyEditor from "@/components/posts/tiny-editor";
import VisualEditor from "@/components/posts/jodit-editor";
import { Button } from "@/components/ui/button";
import JoditEditorComponent from "@/components/posts/jodit-editor-update";
import { fetchPostCategoryList } from "@/actions/category-action";
import { handlePostCreate } from "@/actions/post-create";
import { Checkbox } from "@/components/ui/checkbox";
import Script from "next/script";
import { useSession } from "next-auth/react";
import AuthErrorStatus from "@/components/auth/error-status";

  // Define the schema for validation
export const FormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
    categories: z.array(z.string()).min(1, "Please select at least one category"),
});

// Define the form values interface based on schema
type FormValues = z.infer<typeof FormSchema>;


const CreatePostPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { data: session, status } = useSession()
  const [categoriesList, setCategoriesList] = useState([]);
  
  const form = useForm<z.infer<typeof CreateNewPostSchema>>({
    resolver: zodResolver(CreateNewPostSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const [formData, setFormData] = useState<FormValues | null>(null);
    // Handle form submission
    
    const onSubmit = async (data: FormValues) => {
        setFormData(data); // You could send this data to an API
        try{
          const response = await handlePostCreate(data, session?.user?.token || null);
          if(response.errors || response.exception){
            setErrorMessage('Error creating post!');
          }else{
            setSuccessMessage('Post Created');
          }
        }catch(error){
          console.log('Error sending request to post creation.');
        }

    };


  useEffect(() => {
    fetchPostCategoryList().then((response) => {
      setCategoriesList(response);
    });
  }, []); 

  return (
    <section className="py-12">
      
      <div className="container">
        {errorMessage && <AuthErrorStatus error message={errorMessage} />}
        {successMessage && <AuthErrorStatus message={successMessage} />}
        <div className="mt-5">
          <BreadCrumb />
        </div>

        {/* post create form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            placeholder="Add a title to your post"
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Content
          </label>
          <Controller
            name="description"
            control={control}
            render={({field})=>(
              <TinyEditor field={field}/>
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Categories - Custom Checkbox */}
        <div className="">
          <label className="block font-medium mb-2">Categories</label>
          <div className="grid grid-cols-4 gap-4 space-y-2">
            {categoriesList.map((category) => (
              <div key={category.id} className="flex items-center">
                {/* sr-only for visually hidden input */}
                <input
                  type="checkbox"
                  id={category.id}
                  value={category.id}
                  {...register("categories")}
                  className="sr-only peer"
                />
                {/* Label styling using peer */}
                <label
                  htmlFor={category.id}
                  className="flex-1 bg-gray-200 rounded-md px-3 py-2 cursor-pointer peer-checked:bg-black peer-checked:text-white transition"
                >
                  {category.title}
                </label>
              </div>
            ))}
          </div>
          {errors.categories && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categories.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-gray-800 p-4 text-white py-2 rounded hover:bg-gray-700 transition mr-auto disabled:opacity-600"
        >
          {isSubmitting ? 'Please wait...' : 'Submit'}
        </button>
      </form>
      </div>      
    </section>
  );
};

export default CreatePostPage;
