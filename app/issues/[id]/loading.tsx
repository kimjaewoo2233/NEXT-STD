import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import Skeleton from '@/app/components/Skeleton';
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import React from 'react'
import ReactMarkdown from 'react-markdown';

export const LoadingIssueDetailPage = () => {
  return (
    <Box>
      <Skeleton/>
      <Flex my="2" className='space-x-3'>
          <Skeleton width="5rem"/>
          <Skeleton width="8rem"/>
      </Flex>
      <Card className='prose' mt="4">
          <Skeleton count={3}/>
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage;
