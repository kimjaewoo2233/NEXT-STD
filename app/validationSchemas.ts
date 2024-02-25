import { z } from 'zod';

export const issueSchema = z.object({
    title: z.string().min(1, "그ㄹ자가 짧아요").max(255),
    description: z.string().min(1, "내용이 짧다 ")
});
