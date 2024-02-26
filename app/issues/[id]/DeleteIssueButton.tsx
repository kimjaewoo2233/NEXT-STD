"use client"
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red">Delete Issue</Button>
            </AlertDialog.Trigger>

            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>정말 삭제하시길 원합닌까?</AlertDialog.Description>

                <Flex gap={"3"}>
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">Cancel</Button>
                    </AlertDialog.Cancel> 

                    <AlertDialog.Action>
                        <Button color="red">Delete Issue</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteIssueButton;
