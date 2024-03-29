import { Button, Link, Table } from '@radix-ui/themes';
import React from 'react'
import Skeleton from '../components/Skeleton';

export const LoadingIssuesPage = () => {

  const issues = [1, 2, 3, 4, 5];

  return (
    <div>
    <div className='mb-5'>
        <Button>
            <Link href='/issues/new' >New Issue</Link>
        </Button>
    </div>

    <Table.Root variant='surface'>
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>CreatedAt {'생성일자'}</Table.ColumnHeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {issues?.map(issue => (
                <Table.Row key={issue}>
                    <Table.Cell><Skeleton/>
                        <div className='block md:hidden'>
                            <Skeleton/>
                        </div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>  <Skeleton/></Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>  <Skeleton/></Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table.Root>
</div>
  )
}

export default LoadingIssuesPage;

