import * as XLSX from 'xlsx';

export async function jsonToExcel<T>(data: T[], fileName: string) {
	try {
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(data);

		XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet 1');
		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

		const blob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});

		const url = window.URL.createObjectURL(blob);
		return {
			url,
			fileName
		};
	} catch (error) {
		console.error(error);
		throw new Error('Something went wrong could not convert data to excel');
	}
}
