import React from 'react';
import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from "react-markdown";
import delay from 'delay';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Link } from '@/app/components';
import IssueDetails from './IssueDetails';

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

    const numericId = parseInt(params.id, 10);

    if(isNaN(numericId) || numericId.toString() !== params.id ){
        notFound();
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id) },
    });

    if(!issue) notFound();


    return (
        <Grid columns={{ initial: "1", md: "2"}} gap="5">
            <Box>
               <IssueDetails issue={issue}/>
            </Box>

            <Box>
                <Button>
                    <Pencil2Icon/>
                    <Link href={`/issues/${issue.id}`} >Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
  )
}

export default IssueDetailPage;
