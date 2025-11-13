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

	async sendPasswordRecoveryLink(address, link) {
		await this.transporter.sendMail({
			from: process.env.MAIL_USER,
			to: address,
			subject: 'Восстановление пароля',
			text: '',
			html: `
				<div>
					<p>Вы сделали запрос на восстановление пароля. Если это были не Вы, проигнорируйте данное письмо</p>
					<p>Для восстановления пароля перейдите по ссылке:
						<a href=${link}>${link}</a>
					</p>
					<p>Эта ссылка действительная только 1 час</p>
				</div>
			`
		})
	}
}

export default new MailService()