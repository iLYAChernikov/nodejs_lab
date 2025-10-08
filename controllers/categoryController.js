import { where } from "sequelize";
import { Category } from "../models.js";

class categoryController {
	async create(req, res) {
		const newCategory = {
			name: req.body.name
		}
		const categ = await Category.create(newCategory)
		console.log('category:', categ)
		res.json(newCategory)
	}

	async getAll(req, res) {
		const all = await Category.findAll()
		res.json(all)
	}

	async change(req, res) {
		const result = await Category.update({ name: req.body.name }, { where: { id: Number(req.body.id) } })
		res.json(result)
	}

	async delete(req, res) {
		const result = await Category.destroy({ where: { id: req.params.id } })
		res.json(result)
	}
}

export default new categoryController()