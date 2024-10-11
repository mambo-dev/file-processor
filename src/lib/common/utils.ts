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
