"use client"

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root> {/**이거 클라이언트 컴포넌트여야만함 */}
                <TextField.Input placeholder="Title"/>
            </TextField.Root>

            <TextArea placeholder="Description"/>

            <Button>
                Create New Issue
            </Button>
        </div>        
    )
}

export default NewIssuePage;
