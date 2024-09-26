import type { Actions, PageServerLoad } from './$types.js';
import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fileSchema } from '$lib/common/schemas.js';
import * as XLSX from 'xlsx';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(fileSchema))
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(fileSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const file = form.data.file;
		const fileBuffer = await file.arrayBuffer();
		try {
			const workbook = XLSX.read(fileBuffer, { type: 'array' });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

			console.log(jsonData.length, jsonData[0]);
		} catch (error) {
			console.error('Error processing XLSX file:', error);
			return fail(500, { form, error: 'Invalid Excel file format' });
		}

		return message(form, 'You have uploaded a valid file!');
	}
};
