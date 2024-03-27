const nodemailer = require("nodemailer");
const ejs = require("ejs");
require("dotenv").config();
const path = require("path");

const transporter = nodemailer.createTransport({
	service: process.env?.NODEMAILER_SERVICE,
	host: process.env?.NODEMAILER_HOST,
	port: process.env?.NODEMAILER_PORT,
	secure: process.env?.NODEMAILER_SECURE,
	auth: {
		user: process.env.GOOGLE_MAIL,
		pass: process.env.GOOGLE_APP_PASSWORD,
	},
});

const sendBdayMail = (name) => {
	try {
		ejs.renderFile(
			path.resolve(__dirname + "/public/mail.ejs"),
			{ name },
			(err, data) => {
				if (!err) {
					const mailOptions = {
						from: process.env?.GOOGLE_MAIL,
						to: process.env?.HR_MAIL,
						subject: `🎉 Happy Birthday, ${name} 🎂`,
						html: data,
					};
					transporter.sendMail(mailOptions, (err, info) => {
						if (err) {
							console.log(err);
						}
						if (info) {
							console.log(info);
						}
					});
				} else {
					console.log(err);
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
};

module.exports = sendBdayMail;
