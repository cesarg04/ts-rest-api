import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async(req: Request, res: Response) => {

    const usuarios = await Usuario.findAll()

    res.json({
        msg: 'getUsuarios',
        usuarios
    })


}

export const getUsuario = async(req: Request, res: Response) => {

    const { id } = req.params; 

    const usuarios = await Usuario.findByPk(id)

    if (!usuarios) {
        return res.status(404).json({
            msg: 'User not found'
        })
    }
    
    res.json({
        msg: 'getUsuarios id',
        usuarios
    })

}

export const postUsuario = async(req: Request, res: Response) => {

    const { body } = req; 

    try {

        const existeEmail = await Usuario.findOne({
            where:{
                email: body.email
            }
        })

        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un unario con el email' + body.email
            })
        }
        
        const usuario = await Usuario.create(body);

        res.json({
        msg: 'posttUsuarios',
        usuario
    })


    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


    
}


export const putUsuario = async(req: Request, res: Response) => {

    const { id } = req.params; 
    const { body } = req; 

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            })
        }

        await usuario.update( body )

        res.json(usuario)

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

export const deleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;  

    const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            })
        }

        //await usuario.destroy();
        await usuario.update({ estado: false })

    res.json({
        msg: 'usuario eliminado'
    })

}