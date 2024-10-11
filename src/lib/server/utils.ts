import type { Data } from '$lib/types';
import fs from 'fs/promises';
import path from 'path';

export function removeDuplicates<T>(data: Data<T>[], on: string): Data<T>[] {
	console.log(data, on);
	const uniqueValues: Data<T>[] = [];

	return uniqueValues;
}

export async function writeFile(fileName: string, data: ArrayBuffer) {
	try {
		const rootDir = process.cwd();
		const uploadsDir = path.join(rootDir, 'uploads');
		if (!(await directoryOrFileExists(uploadsDir))) {
			await fs.mkdir(uploadsDir, { recursive: true });
		}

		const filePath = path.join(rootDir, 'uploads', fileName);
		await fs.writeFile(filePath, new Uint8Array(data));
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function directoryOrFileExists(path: string) {
	try {
		await fs.stat(path);
		return true;
	} catch (error) {
		//@ts-expect-error code is in error
		if (error instanceof Error && error.code === 'ENOENT') {
			console.log('File not found');
			return false;
		} else {
			console.error('An unexpected error occurred:', error);
			throw error;
		}
	}
}

export async function readFile(fileName: string) {
	try {
		const rootDir = process.cwd();

		const filePath = path.join(rootDir, 'uploads', fileName);
		const file = await fs.readFile(filePath);

		return file.buffer;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getDirectoryFileNames(dirPath: string): Promise<string[]> {
	try {
		const files = await fs.readdir(dirPath);
		return files;
	} catch (error) {
		console.error('Error reading directory:', error);
		return [];
	}
}
