import { where } from "sequelize";
import { User } from "../models/models.js";
import { v4 } from "uuid"
import path from 'path'
import { error } from "console";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mailService from "../mailService.js";

const getToken = (id, email) => {
	return jwt.sign({ id, email }, String(process.env.PRIVATE_KEY), { expiresIn: '10h' })
}

const getResetToken = (id, email) => {
	return jwt.sign({ id, email }, String(process.env.RESET_PASSWORD_KEY), { expiresIn: '1h' })
}

class userController {

	async create(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				return next(Error("Указаны некорректные email или пароль!"))
			}
			const visiter = await User.findOne({ where: { email: email } })
			if (visiter) {
				return next(Error("Пользователь с таким email уже зарегистрирован!"))
			}

			const hashedPass = await bcrypt.hash(password, 3)
			const activationLink = v4()
			const newUser = {
				email: email,
				password: hashedPass,
				activationLink: activationLink,
				isActivated: false,
				first_name: "",
				last_name: "",
				avatar: "",
				resetPasswordToken: null
			}
			const result = await User.create(newUser)

			mailService.sendActivationLink(newUser.email, `http://${process.env.HOST}:${process.env.PORT}/api/login/activate/${activationLink}`)

			res.status(200).json(newUser);

		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async login(req, res, next) {
		const { email, password } = req.body

		const visiter = await User.findOne({ where: { email: email } })
		if (!visiter) {
			return next(Error("Пользователь с данным email не зарегистрирован!"))
		}

		const compare = bcrypt.compareSync(password, visiter.password)
		if (!compare) {
			return next(Error("Неверный пароль!"))
		}

		const token = getToken(visiter.id, visiter.email)
		res.json(token)
	}

	async activate(req, res, next) {
		const activationLink = req.params.link
		const user = await User.findOne({ where: { activationLink } })
		user.isActivated = true
		await user?.save()
		res.json('Ваш профиль был активирован')
	}

	async forgotPassword(req, res) {
		const { email } = req.body
		console.log(email)
		const user = await User.findOne({ where: { email } })

		if (!user)
			return res.status(500).json({ message: 'Пользователь с таким email не зарегистрирован' })

		const resetToken = getResetToken(user.id, user.email)
		user.resetPasswordToken = resetToken
		await user.save()

		const resetLink = `http://${process.env.HOST}:${process.env.PORT}/api/reset-password/${resetToken}`

		try {
			mailService.sendPasswordRecoveryLink(user.email, resetLink)
			return res.status(200).json({ message: 'Ссылка для восстановления пароля была отправлена на Ваш email' })
		}
		catch (error) {
			user.resetPasswordToken = undefined
			await user.save()
			return res.status(500).json({ message: 'Не удалось отправить ссылку для восстановления пароля. Попробуйте позже' })
		}
	}

	async resetPassword(req, res) {
		try {			
			const { password } = req.body
			console.log(password)
			const { token } = req.params
			console.log(token)

			const user = await User.findOne({ where: { resetPasswordToken: token } })

			const decode = jwt.verify(token, process.env.RESET_PASSWORD_KEY)
			if (!decode) {
				return res.status(500).json({ message: 'Полученный токен не валиден' })
			}

			user.password = await bcrypt.hash(password, 3)
			user.resetPasswordToken = undefined
			await user?.save()
		}
		catch (error) {
			return res.status(500).json({ message: 'Полученный токен не валиден' })
		}
		return res.status(200).json({ message: 'Пароль успешно был изменён' })
	}

	async changeProfile(req, res) {
		try {
			const { avatar } = req.files;
			const fileName = v4() + path.extname(avatar.name);
			const filePath = path.resolve(path.resolve(), 'uploads', fileName);

			await avatar.mv(filePath);

			const { first_name, last_name } = req.body
			const avatarLink = '/uploads/' + fileName

			const result = await User.update({
				first_name,
				last_name,
				avatar: avatarLink,
			},
				{ where: { id: req.params.id } })

			res.status(200).json("avatar link: " + avatarLink)
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async deleteById(req, res) {
		try {
			const result = await User.destroy({ where: { id: req.params.id } })
			res.json(result)
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async getAllProfiles(req, res) {
		try {
			const all = await User.findAll()
			res.json(all)
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async getOneProfileById(req, res) {
		try {
			const result = await User.findOne({ where: { id: req.params.id } })
			res.json(result)
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

export default new userController()