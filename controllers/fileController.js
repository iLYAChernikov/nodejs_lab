import { v4 } from "uuid"
import path from 'path'

class fileController { 
	async create(req, res) {		
		const { ufile } = req.files;
		const fileName = v4() + ufile.name;
		await ufile.mv(path.resolve(path.resolve(), 'uploads', fileName))		
	}
}

export default new fileController()