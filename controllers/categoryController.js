import { json } from "sequelize";
import { Category } from "../models";

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
		const result = await Category.findOneAndUpdate({ id: req.body.id }, { $set: { name: req.body.name } })
		res.json(result)
	}

	async delete(req, res) {
		const result = await Category.deleteOne({ id: req.params.id })
		res.json(result)
	}
}

export default new categoryController()