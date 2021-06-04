import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import clienteAxios from "./config/axios";
// Componentes import
import Pacientes from "./components/Pacientes";
import NuevaCita from "./components/NuevaCita";
import Cita from "./components/Cita";

function App() {
	// State de la app
	const [citas, guardarCitas] = useState([
		{
			_id: "60b9a702f1e1f60ebc7f6aa4",
			nombre: "Summer",
			propietario: "Juan",
			fecha: "2021-06-10",
			hora: "15:07",
			telefono: "09987654",
			sintomas: "Sick"
		}
	]);
	// Se agrego la bvariable consultar para que no de problemas en github pages
	const [consultar, guardarConsultar] = useState(
		process.env.CONSULTAR || false
	);
	useEffect(() => {
		if (consultar) {
			const consultarAPI = () => {
				clienteAxios
					.get("/pacientes")
					.then((respuesta) => {
						// Colocar en el state el resultado
						guardarCitas(respuesta.data);

						// desabilitar la cosulta
						guardarConsultar(false);
					})
					.catch((error) => {
						console.log(error);
					});
			};
			consultarAPI();
		}
	}, [consultar]);

	return (
		<Router>
			<Switch>
				<Route exact path="/" component={() => <Pacientes citas={citas} />} />

				<Route
					exact
					path="/nueva"
					component={() => <NuevaCita guardarConsultar={guardarConsultar} />}
				/>

				<Route
					exact
					path="/cita/:id"
					render={(props) => {
						const cita = citas.filter(
							(cita) => cita._id === props.match.params.id
						);
						return <Cita cita={cita[0]} guardarConsultar={guardarConsultar} />;
					}}
				/>
			</Switch>
		</Router>
	);
}

export default App;
