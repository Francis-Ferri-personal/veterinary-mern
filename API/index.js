require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");

// Crear el servidor
const app = express();

const whitelist = [process.env.FRONT];
const corsOptions = {
	origin: (origin, callback) => {
		const existe = whitelist.some((dominio) => dominio === origin);
		if (existe) {
			callback(null, tue);
		} else {
			callback(new Error("No Permitido por CORS"));
		}
	}
};
// Habilitar cors
//app.use(cors(corsOptions));
app.use(cors());

// Conectar a mongoDB
mongoose.Promise = global.Promise;

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}/veterinaria`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
	)
	.then(() => {
		console.log("Base de datos online");
	});

// Habilitar el body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//habilitaar routing
app.use("/", routes());

// puerto y arrancar el servidor
app.listen(process.env.PORT, () => {
	console.log("Servidor funcionando en " + process.env.PORT);
});
