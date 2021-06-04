const Paciente = require("../models/Paciente");
const { json, request } = require("express");

// Cuando se crea un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    console.log(req.body)
    // Crear objeto de paciente con datos de requiest. body
    const paciente = new Paciente(req.body);
    try {
        await paciente.save();
        res.json({mensaje: "El cliente se agrego correctamente"});
    } catch (error){
        console.log(error);
        next();
    }
}

// Obtener todos los pacientes
exports.obtenerPacientes = async (req, res, next) => {
    try{
        const pacientes = await Paciente.find({});
        res.json(pacientes);
    } catch (error){
        console.log(error);
        next();
    }
}

// obytieen un paciente especifico por su id 
exports.obtenerPaciente = async(req, res, next) =>{
    try{
        // Los params son los parametrops definidos en la url
        // pacientes/1
        const paciente = await Paciente.findById(req.params.id);
        res.json(paciente);
    } catch (error){
        console.log(error);
    }
}

// Actualiza un pacuiente
exports.actualizarPaciente = async (req, res, next) => {
    try{
        const paciente = await Paciente.findOneAndUpdate(
            {_id : req.params.id}, 
            req.body,
            {new:true}
        );
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Elimina Pacientes
exports.eliminarPaciente = async (req, res, next) => {
    try{
        await Paciente.findOneAndDelete({_id : req.params.id});
        res.json({mensaje : "Se eliminop el registro"});
    } catch (error) {
        console.log(error);
        next();
    }
}