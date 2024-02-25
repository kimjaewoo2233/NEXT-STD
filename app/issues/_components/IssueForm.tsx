"use client"

import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Text } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false});
type IssueFormData = z.infer<typeof issueSchema>; // 스키마 기반으로 타입생성

const IssueForm = ({ issue }: { issue?: Issue }) => {

    const { 
        register,
        control, 
        handleSubmit, 
        formState: { errors }
    } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    const [isSubmitting, setSubmitting] = useState(false);
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = handleSubmit(async (data) => {
        try{
             setSubmitting(true);
             if(issue){
                await axios.patch("/api/issues" + issue.id, data);

             } else {
                await axios.post("/api/issues",data);

             }           
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
                <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")}/>
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
                defaultValue={issue?.description}
                name="description"
                control={control}
                render={({field}) => (
                    <SimpleMDE placeholder="Description" {...field}/>
                )}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={isSubmitting}>
                {issue ? "Update Issue" : "Submit New Issue"}
                { isSubmitting && <Spinner/> }
            </Button>
        </form>        
      </div>
    )
}

export default IssueForm;
