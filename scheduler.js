const { RecurrenceRule, scheduleJob } = require("node-schedule");
const fList = require("./csvReader");
const moment = require("moment");
const sendBdayMail = require("./nodemailer");

const startTime = new RecurrenceRule();
startTime.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
startTime.hour = 15;
startTime.minute = 12;
startTime.second = 46;
startTime.tz = "Asia/Kolkata";

const currentDate = moment().format("DD/MM");
console.log(currentDate);

scheduleJob(startTime, async () => {
	try {
		const list = await fList();
		const today = list.filter((item) => {
			return item?.dob === currentDate;
		});
		console.log(today);
		today.forEach((item) => {
			sendBdayMail(item?.name);
		});
	} catch (error) {
		console.error("An error occurred:", error);
	}
});
