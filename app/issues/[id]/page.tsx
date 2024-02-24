import React from 'react';
import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';
import { Card, Flex, Heading } from '@radix-ui/themes';
import { Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from "react-markdown";

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
        <div>
            <Heading>{issue.title}</Heading>
            <Flex my="2" className='space-x-3'>
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt="4">
                <ReactMarkdown>{issue.description}</ReactMarkdown >
            </Card>
        </div>
  )
}

export default IssueDetailPage;
