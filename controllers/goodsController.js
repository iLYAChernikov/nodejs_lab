import { where } from "sequelize";
//import { Goods } from "../models/models.js";

class goodsController {
	async create(req, res) {
		const item = {
			productId: req.body.productId,
			price: req.body.price,
			expiration_date: req.body.expiration_date
		}
		const result = await Goods.create(item)
		console.log('Goods:', result)
		res.json(item)
	}

	async getAll(req, res) {
		const all = await Goods.findAll()
		res.json(all)
	}

	async getOne(req, res) {
		const result = await Goods.findOne({ where: { id: req.params.id } })
		res.json(result)
	}

	async getByCategory(req, res) {
		const result = await Goods.findAll({ where: { productId: req.params.pr } })
		res.json(result)
	}

	async change(req, res) {
		const result = await Goods.update(
			{
				productId: req.body.productId,
				price: req.body.price,
				expiration_date: req.body.expiration_date
			}, {
			where: { id: req.body.id }
		})
		res.json(result)
	}

	async delete(req, res) {
		const result = await Goods.destroy({ where: { id: req.params.id } })
		res.json(result)
	}
}

export default new goodsController()