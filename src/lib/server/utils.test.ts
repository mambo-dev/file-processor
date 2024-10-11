import { afterAll, describe, expect, it } from 'vitest';
import { readFile, writeFile } from './utils';
import path from 'path';
import fs from 'fs/promises';

describe('User Upload and Retrieval', () => {
	const fileName = 'test.txt';
	const rootDir = process.cwd();
	const uploadsDir = path.join(rootDir, 'uploads');
	const filePath = path.join(uploadsDir, fileName);

	afterAll(async () => {
		try {
			await fs.unlink(filePath);
		} catch (error) {
			// @ts-expect-error error code
			if (error.code !== 'ENOENT') {
				console.error('Error deleting test file:', error);
			}
		}
	});

	it('should write file to uploads', async () => {
		const data = new TextEncoder().encode('This is a test file content.').buffer;

		const result = await writeFile(fileName, data);

		expect(result).toBe(true);
	});

	it('should read file from uploads', async () => {
		const result = await readFile(fileName);

		expect(result).not.toBeNull();
	});

	it('should return null if the file does not exist', async () => {
		const result = await readFile('non-existent-file.txt');

		expect(result).toBeNull();
	});
});
