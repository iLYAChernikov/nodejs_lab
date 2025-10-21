import { Sequelize } from "sequelize";
//import mysql from 'mysql2'
import sqlite3 from 'sqlite3'
import path from 'path';
import { fileURLToPath } from 'url';

/*
	const seq = new Sequelize('market_app', 'root', 'root', {
		host: 'localhost',
		port: 3306,
		dialect: 'mysql'
	})
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seq = new Sequelize({
	dialect: 'sqlite',
	storage: path.join(__dirname, 'market_app.sqlite'),
	logging: true
})

export { seq }