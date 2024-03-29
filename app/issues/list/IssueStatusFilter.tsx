"use client"

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes"

const statuses: { label: string, value?: Status}[] = [
    { label: 'All'},
    { label: 'Open', value: 'OPEN'},
    { label: 'In Progress', value: "IN_PROGRESS"},
    { label: 'Closed', value: "CLOSED"},

]

const IssueStatusFilter = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder="상태값으로 필터링하기..."/>
            <Select.Content>
                {
                    statuses.map((status) => (
                        <Select.Item key={status.value} value={status.value || "All"}>
                            {status.label}
                        </Select.Item>
                    ))
                }
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter;
