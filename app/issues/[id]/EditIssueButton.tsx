import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import React from 'react'

export const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
        <Pencil2Icon/>
            <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  )
}
