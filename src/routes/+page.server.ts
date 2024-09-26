import type { Actions, PageServerLoad } from './$types.js';

import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fileSchema } from '$lib/common/schemas.js';

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

		console.log(form.data.file);

		return message(form, 'You have uploaded a valid file!');
	}
};
