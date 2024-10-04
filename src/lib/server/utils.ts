import type { Data } from '$lib/types';
import * as XLSX from 'xlsx';

export async function excelToJson(file: ArrayBuffer) {
	try {
		const workbook = XLSX.read(file, { type: 'array' });
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		return jsonData;
	} catch (error) {
		console.error(error);
		throw new Error('Something went wrong could not convert file');
	}
}

// take an array of objects
// remove duplicate on a certain key for each
// so we check if the key provided exists on the data sets
// if it exists then we need to find store values and return only unique

export function removeDuplicates<T>(data: Data<T>[], on: string): Data<T>[] {
	console.log(data, on);
	const uniqueValues: Data<T>[] = [];

	return uniqueValues;
}
