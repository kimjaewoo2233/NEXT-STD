"use client"

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import toast, {Toaster} from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const { 
        data: users, //사용자 데이터는 초기에 존재하지 않으니 ? 옵셔널로 사용해야함
        error,
        isLoading
     } = useUsers();

    if(isLoading) return <Skeleton/>
    if(error) return null;

    const assignIssue = (userId: string) => {
        axios
            .patch("/api/issues/"+ issue.id, { assignedToUser: userId || "unassigned" ? null : userId })
            .catch(() => {
                toast.error("담당자 업데이트에 문제가 발생함 ")
            });
    }

    return (
       <>
         <Select.Root onValueChange={assignIssue}>
            <Select.Trigger placeholder='다ㅁ당자...'/>

                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="">담당자가 존재하지 않습니다.</Select.Item>
                        {users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}

                    </Select.Group>
                </Select.Content>
            </Select.Root>
        <Toaster/>
       </>
    )
}

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60* 1000, // 1000 = 1초 (데이터를 처음 한번 받아온 뒤 60초동안은 캐시로 저장된거 사용하고 그 뒤 새로운 데이터받아옴)
    retry: 3, //데이터 요청 실패하면 몇번을 다시 요청한 후 해당 요청횟수까지 다 실패하면 실패처리
});



export default AssigneeSelect