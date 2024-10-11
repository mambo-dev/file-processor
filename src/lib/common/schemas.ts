import { z } from 'zod';

const SUPPORTED_MIME_TYPES = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

export const fileSchema = z.object({
	file: z.instanceof(File).refine((file) => SUPPORTED_MIME_TYPES.includes(file.type), {
		message: 'Only .xlsx files are allowed'
	})
});

export const instruction = z.object({
	instruction: z.enum(['removeDuplicates', 'filter', 'sort']),
	on: z.string().optional()
});

export const removeDuplicates = z
	.object({
		columns: z.array(z.string()).min(1, 'You should select atleast one column')
	})
	.optional();

const filterBy = z.object({
	columnName: z.string({ required_error: 'A column name is required' }),
	columnInstructions: z.enum(['=', '>', '<', '>=', '<=', '!=']),
	columnFilterValue: z.union([z.number(), z.string(), z.date()])
});

export const filter = z
	.object({
		by: z.array(filterBy).min(1, 'enter atleast one filter')
	})
	.optional();

const sortBy = z.object({
	columnName: z.string({ required_error: 'A column name is required' }),
	sortInstructions: z.enum(['asc', 'desc'])
});

// TODO:restrict on frontend sort by a then by b so array comes in etc...
// as the backend will process them in the order they appear in the array.
export const sort = z
	.object({
		by: z.array(sortBy).min(1, 'enter atleast one sort')
	})
	.optional();

export const processFileInstructions = z.object({
	removeDuplicates,
	filter,
	sort
});
