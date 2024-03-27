const Fs = require("fs");
const CsvReadableStream = require("csv-reader");

const fList = () => {
	return new Promise((resolve, reject) => {
		let inputStream = Fs.createReadStream("dob.csv", "utf8");
		const list = [];
		inputStream
			.pipe(
				new CsvReadableStream({
					parseNumbers: true,
					parseBooleans: true,
					trim: true,
				})
			)
			.on("data", (row) => {
				const dateStr = row[2];
				const parts = dateStr.split("/");
				const formattedDate = parts.slice(0, 2).join("/");
				list.push({
					name: row[1],
					dob: formattedDate,
				});
			})
			.on("end", () => {
				list.shift();
				resolve(list);
			})
			.on("error", function (err) {
				reject(err);
			});
	});
};

// (async () => {
// 	try {
// 		const list = await fList();
// 		console.log(list);
// 	} catch (error) {
// 		console.error("An error occurred:", error);
// 	}
// })();

module.exports = fList;
