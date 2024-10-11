import { processFileInstructions } from '$lib/common/schemas';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import path from 'path';
import {
	directoryOrFileExists,
	excelToJson,
	getDirectoryFileNames,
	readFile
} from '$lib/server/utils';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const rootDir = process.cwd();
	const fileId = event.params.fid;
	console.log(rootDir);

	const uploadDir = path.join(rootDir, 'uploads');

	if (!(await directoryOrFileExists(uploadDir))) {
		return error(404, 'Something unexpected happened');
	}

	const files = await getDirectoryFileNames(uploadDir);
	let fileName: string | null = null;

	for (const file of files) {
		const splitId = file.split('-')[0];

		if (splitId === fileId) {
			fileName = file;
		}
	}

	if (!fileName) {
		return error(500, 'Could not get expected file');
	}

	const fileBuffer = await readFile(fileName);

	if (!fileBuffer) {
		return error(500, 'Could not get expected file');
	}

	return {
		form: await superValidate(zod(processFileInstructions)),
		data: fileBuffer
	};
};
