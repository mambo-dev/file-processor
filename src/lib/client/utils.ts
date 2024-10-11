import type { JsonData } from '$lib/types';
import * as XLSX from 'xlsx';

export async function jsonToExcel<T>(data: T[]) {
	try {
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(data);

		XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet 1');
		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

		return excelBuffer;
	} catch (error) {
		console.error(error);
		throw new Error('Something went wrong could not convert data to excel');
	}
}

export async function getUrlFromBuffer(buffer: ArrayBuffer): Promise<string> {
	const blob = new Blob([buffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	});

	const url = window.URL.createObjectURL(blob);

	return url;
}

export function getFileHeaderRows(jsonData: JsonData) {
	try {
		const headerRow = jsonData[0] as string[];

		return headerRow;
	} catch (error) {
		console.error(error);
		throw new Error('Something went wrong could not convert data to excel');
	}
}
