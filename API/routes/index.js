const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteControllers")

module.exports = function(){
    
    // Agrega nuevos pacientes via post
    
    router.post("/",() => {
        console.log("En Home");
    })
    router.post("/pacientes",
        pacienteController.nuevoCliente
    )
    

    // Obtien todos los registros de pacientes een la base de datps
    router.get("/pacientes",
        pacienteController.obtenerPacientes
    );


    // Obtiene un pacente en especifico (ID)
    // para hacer adaptable la url se utilizan los dos puntos
    router.get("/pacientes/:id", 
        pacienteController.obtenerPaciente
    );

    // Actuializar un registro con un ID especifico
    router.put("/pacientes/:id",
        pacienteController.actualizarPaciente
    );

    // Eliminar paciente por su ID
    router.delete("/pacientes/:id",
        pacienteController.eliminarPaciente
    )

    return router;
}