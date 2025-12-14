import jwt from 'jsonwebtoken'

export function checkRoleMiddleware(role) {
	return function checkRole (req, res, next) {
		if (req.method == 'OPTION') {
			next()
		}
		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: "Пользователь не авторизован!" })
			}
			const decode = jwt.verify(token, process.env.PRIVATE_KEY)
			if (decode.role !== role) {
				return res.status(401).json({ message: "У Вас нет прав на это действие!" })
			}
			next()
		}
		catch {
			res.status(401).json({ message: "Пользователь не авторизован!" })
		}
	}
}