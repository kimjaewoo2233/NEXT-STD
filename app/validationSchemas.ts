import { MdDescription } from 'react-icons/md';
import { z } from 'zod';

export const issueSchema = z.object({
    title: z.string().min(1, "그ㄹ자가 짧아요").max(255),
    description: z.string().min(1, "내용이 짧다 ").max(65535)
});

export const patchIssuesSchema = z.object({
    title: z.string().min(1, "글자가 짧아요").max(255).optional(),
    description: z.string().min(1).max(65535).optional(),
    assignedToUserId: z
            .string()
            .min(1, "AssignedToUserId is required")
            .max(255)
            .optional()
            .nullable(),
});

