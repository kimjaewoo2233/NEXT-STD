import { issueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import delay from "delay";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string }})
{
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id)}
    });

    if(!issue){
        return NextResponse.json(
            { error : "이슈를 찾을 수 없습니다."},
            { status: 404}
        );
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(updatedIssue);

}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string }}
){
    await delay(200);
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if(!issue){
        return NextResponse.json(
            { error: "유효하지 않은 이슈입니다." },
            { status: 404 }
        );
    }

    await prisma.issue.delete({ where: { id: issue.id }});

    return NextResponse.json({});
}
