import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    //safeParse 는 유효성 검사 실패시 시트메을 멈추는 대신에 오류 정보가 담긴 객체를 리턴한다.

    if(!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400});

    const newIssue = await prisma?.issue.create({
        data: { title: body.title, description: body.description},
    })

    return NextResponse.json(newIssue, { status: 201});
}