import { where } from "sequelize";
import { Product, Review, User } from "../models/models.js";

class reviewController {
	async create(req, res, next) {
		const review = {
			text: req.body.text,
			productId: Number(req.body.productId),
			userId: Number(req.body.userId)
		}

		const product = await Product.findOne({ where: { id: review.productId } });
		const user = await User.findOne({ where: { id: review.userId } });
		const post = await Review.findOne({ where: { productId: review.productId, userId: review.userId } });

		if (post)
			return next(Error("Отзыв уже был написан!"))

		if (!user || !product)
			return next(Error("Пользователь или продукт не найдены!"))

		const result = await Review.create(review)

		res.json(result)
	}

	async getAll(req, res) {
		const all = await Review.findAll()
		res.json(all)
	}

	async getAllByProduct(req, res) {
		const all = await Review.findAll({ where: { productId: req.query.productId } });
		res.json(all)
	}

	async getAllByUser(req, res) {
		const all = await Review.findAll({ where: { userId: req.query.userId } });
		res.json(all)
	}

	async change(req, res) {
		const { text, productId, userId } = req.body;

		const result = await Review.update({ text }, { where: { productId: productId, userId: userId } });
		res.json(result)
	}

	async delete(req, res, next) {
		const { productId, userId } = req.query;
		const post = await Review.findOne({ where: { productId: productId, userId: userId } });
		if (!post)
			return next(Error("Отзыв ещё не был написан!"))

		const result = await Review.destroy({ where: { productId: productId, userId: userId } })
		res.json(result)
	}
}

export default new reviewController()