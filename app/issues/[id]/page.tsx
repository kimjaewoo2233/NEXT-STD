import React from 'react';
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from "react-markdown";
import delay from 'delay';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Link } from '@/app/components';
import IssueDetails from './IssueDetails';
import { notFound } from 'next/dist/client/components/not-found';
import { EditIssueButton } from './EditIssueButton';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';

interface Props {
    params: { id: string }
}


const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions); 
    const numericId = parseInt(params.id, 10);

    if(isNaN(numericId) || numericId.toString() !== params.id ){
        notFound();
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id) },
    });

    if(!issue) notFound();


    return (
        <Grid columns={{ initial: "1", md: "5"}} gap="5">
            <Box className='lg:col-span-4'>
               <IssueDetails issue={issue}/>
            </Box>

            {session && (
                 <Box>
                    <Flex direction="column" gap="4">
                        <AssigneeSelect issue={issue}/>
                        <EditIssueButton issueId={issue.id}/>
                        <DeleteIssueButton issueId={issue.id}/>
                    </Flex>
                </Box>
            )}
        </Grid>
  )
}

export default IssueDetailPage;
