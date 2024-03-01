import { Button, Flex, Link } from "@radix-ui/themes";
import React from "react";
import IssueStatusFilter from "./list/IssueStatusFilter";


const IssueActions = () => {
    return (
        <Flex className="mb-5" justify={"between"}>
            <IssueStatusFilter/>

            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </Flex>
    )
}