import { Product } from "../models";

class productController {
	async create(req, res) {
		const newProd = {
			categoryId: req.params.cat,
			name: req.body.name,
			unit: req.body.unit,
			weight_grams: req.body.weight_grams
		}
		const result = await Product.create(newProd)
		console.log('product:', result)
		res.json(newProd)
	}

	async getAll(req, res) {
		const all = await Product.findAll()
		res.json(all)
	}

	async change(req, res) {
		const result = await Product.findOneAndUpdate({ id: req.body.id }, {
			$set: {
				categoryId: req.body.categoryId,
				name: req.body.name,
				unit: req.body.unit,
				weight_grams: req.body.weight_grams } })
		res.json(result)
	}

	async delete(req, res) {
		const result = await Product.deleteOne({ id: req.params.id })
		res.json(result)
	}
}

export default new productController()