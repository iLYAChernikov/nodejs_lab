import { where } from "sequelize";
import { Category } from "../models/models.js";

class categoryController {
	async create(req, res) {
		const newCategory = {
			name: req.body.name,
			description: req.body.description
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
		const { name, description } = req.body;
		const result = await Category.update({ name, description }, { where: { id: Number(req.body.id) } })
		res.json(result)
	}

	async delete(req, res) {
		const result = await Category.destroy({ where: { id: req.params.id } })
		res.json(result)
	}
}

export default new categoryController()