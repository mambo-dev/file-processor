import { z } from 'zod';

const SUPPORTED_MIME_TYPES = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

export const fileSchema = z.object({
	file: z.instanceof(File).refine((file) => SUPPORTED_MIME_TYPES.includes(file.type), {
		message: 'Only .xlsx files are allowed'
	})
});
