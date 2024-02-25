"use client"

import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssuesSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Text } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false});
type IssueForm = z.infer<typeof createIssuesSchema>; // 스키마 기반으로 타입생성

const NewIssuePage = () => {

    const { 
        register,
        control, 
        handleSubmit, 
        formState: { errors }
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssuesSchema)
    });
    const [isSubmitting, setSubmitting] = useState(false);
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = handleSubmit(async (data) => {
        try{
             setSubmitting(true);
             await axios.post("/api/issues",data);
             router.push("/issues");
             setSubmitting(false);

         }catch(error){
             setSubmitting(false);
             setError('예상치 못한 에러발생했습니다.');
         }
     });

    return (
      <div className="max-w-xl">
          { error && 
            <Callout.Root color="red" className="mb-5">
                 <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
            }
          <form 
            className="space-y-3" 
            onSubmit={onSubmit}>
            <TextField.Root> {/**이거 클라이언트 컴포넌트여야만함 */}
                <TextField.Input placeholder="Title" {...register("title")}/>
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
                name="description"
                control={control}
                render={({field}) => (
                    <SimpleMDE placeholder="Description" {...field}/>
                )}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={isSubmitting}>
                Create New Issue { isSubmitting && <Spinner/> }
            </Button>
        </form>        
      </div>
    )
}

export default NewIssuePage;
