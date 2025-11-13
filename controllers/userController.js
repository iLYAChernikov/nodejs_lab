import { where } from "sequelize";
import { User, Profile } from "../models/models.js";
import { v4 } from "uuid"
import path from 'path'
import { error } from "console";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const getToken = (id, email) => {
	return jwt.sign({ id, email }, String(process.env.PRIVATEKEY), { expiresIn: '10h' })
}

class userController {

	async create(req, res, next) {
		try {
			console.log(req.body)
			const { email, password } = req.body;
			if (!email || !password) {
				return next(Error("Указаны некорректные email или пароль!"))
			}
			const visiter = await User.findOne({ where: { email: email } })
			if (visiter) {
				return next(Error("Пользователь с таким email уже зарегистрирован!"))
			}

			const hashedPass = await bcrypt.hash(password, 3)
			const newUser = {
				email: email,
				password: hashedPass
			}
			const result = await User.create(newUser)

			const profile = {
				first_name: "",
				last_name: "",
				avatar: ""
			}
			await Profile.create(profile)

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
		console.log('activate')
	}

	async changeProfile(req, res) {
		try {
			const { avatar } = req.files;
			const fileName = v4() + path.extname(avatar.name);
			const filePath = path.resolve(path.resolve(), 'uploads', fileName);

			await avatar.mv(filePath);

			const { first_name, last_name } = req.body
			const avatarLink = '/uploads/' + fileName

			const result = await Profile.update({
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
			const all = await Profile.findAll()
			res.json(all)
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async getOneProfileById(req, res) {
		try {
			const result = await Profile.findOne({ where: { id: req.params.id } })
			res.json(result)
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

export default new userController()