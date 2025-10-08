import { Goods } from "../models";

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
		const result = await Goods.find({ id: req.params.id })
		res.json(result)
	}

	async getByCategory(req, res) {
		const result = await Goods.find({ categoryId: req.params.cat })
		res.json(result)
	}

	async change(req, res) {
		const result = await Goods.findOneAndUpdate({ id: req.body.id }, {
			$set: {
				productId: req.body.productId,
				price: req.body.price,
				expiration_date: req.body.expiration_date
			}
		})
		res.json(result)
	}

	async delete(req, res) {
		const result = await Goods.deleteOne({ id: req.params.id })
		res.json(result)
	}
}

export default new goodsController()