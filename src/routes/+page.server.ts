import type { Actions, PageServerLoad } from './$types.js';
import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fileSchema } from '$lib/common/schemas.js';
import { init } from '@paralleldrive/cuid2';
import { writeFile } from '$lib/server/utils.js';
import { redirect } from '@sveltejs/kit';

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

		const createId = init({ length: 10 });

		const uniqueId = createId();

		const renameFile = `${uniqueId}-${file.name}`;
		try {
			if (!(await writeFile(renameFile, fileBuffer))) {
				throw new Error('could not write file');
			}
		} catch (error) {
			console.error('Error processing XLSX file:', error);
			return fail(500, { form, error: 'Invalid Excel file format' });
		}

		throw redirect(300, `/editor/${uniqueId}`);
	}
};
