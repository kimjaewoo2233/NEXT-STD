"use client"

import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {

    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();
    const [error, setError] = useState("");

    return (
      <div className="max-w-xl">
          { error && 
            <Callout.Root color="red" className="mb-5">
                 <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
            }
          <form 
            className="space-y-3" 
            onSubmit={handleSubmit(async (data) => {
               try{
                    await axios.post("/api/issues",data);
                    router.push("/issues");
               }catch(error){
                    setError('예상치 못한 에러발생했습니다.');
                }
            })}>
            <TextField.Root> {/**이거 클라이언트 컴포넌트여야만함 */}
                <TextField.Input placeholder="Title" {...register("title")}/>
            </TextField.Root>

            <Controller
                name="description"
                control={control}
                render={({field}) => (
                    <SimpleMDE placeholder="Description" {...field}/>
                )}
            />
            <Button>
                Create New Issue
            </Button>
        </form>        
      </div>
    )
}

export default NewIssuePage;
