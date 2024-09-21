export const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onloadend = () => {
			resolve(reader.result);
		};

		reader.onerror = (error) => {
			reject(error);
		};

		reader.readAsDataURL(file);
	});
};

const data = [
	{ 1: "JAN" },
	{ 2: "FEB" },
	{ 3: "MAR" },
	{ 4: "APR" },
	{ 5: "MAY" },
	{ 6: "JUN" },
	{ 7: "JUL" },
	{ 8: "AUG" },
	{ 9: "SEP" },
	{ 10: "OCT" },
	{ 11: "NOV" },
	{ 12: "DEC" },
];



export function getEnglishDate(k) {
	let date = new Date(k);
	const dd = date.getDate().toString();
	let mm = date.getMonth();
	mm = Object.values(data[mm])[0];
	const yy = date.getFullYear().toString();

	let final= `${dd+"-"+mm+"-"+yy}`
	return final
}
