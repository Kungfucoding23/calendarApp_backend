const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')

const crearUsuario = async (req, res) => {

    const {email, password} = req.body

    try {
        let usuario = await Usuario.findOne({email})          
        if (!!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario registrado con el email ingresado'
            })
        }
        usuario = new Usuario(req.body)

        //Encriptar contraseña antes de guardar en la bd
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()
    
        res.status(201).json({
            ok: true,
            msg: 'Usuario registrado'
        })    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, por favor intente de nuevo más tarde'
        })
    }
}

const loginUsuario = (req, res) => {
    const {email, password} = req.body

    res.status(200).json({
        ok: true,
        msg: 'login usuario',
        email,
        password
    })
}

const revalidarToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'Revalidar token'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}