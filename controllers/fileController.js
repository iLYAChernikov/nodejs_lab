import { v4 } from "uuid"
import path from 'path'
import { error } from "console";

class fileController {
	async create(req, res) {
		try {
			const { ufile } = req.files;
			const fileName = v4() + path.extname(ufile.name);
			const filePath = path.resolve(path.resolve(), 'uploads', fileName);

			await ufile.mv(filePath);

			res.status(200).json('Файл был загружен!')
		}
		catch (err) {
			console.error('Ошибка загрузки файла:', err)
			res.status(500).json({ error: err.message })
		}
	}
}

export const upfileController = new fileController()