import nodemailer from 'nodemailer'

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			secure: true,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD
			}
		})
	}

	async sendActivationLink(address, link) {
		await this.transporter.sendMail({
			from: process.env.MAIL_USER,
			to: address,
			subject: 'Активация учётной записи',
			text: '',
			html: `
				<div>
					<p>Для активации учётной записи перейдите по ссылке:
						<a href=${link}>${link}</a>
					</p>
				</div>
			`
		})
	}
}

export default new MailService()