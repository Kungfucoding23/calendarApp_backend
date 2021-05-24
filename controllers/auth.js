const Usuario = require('../models/Usuario')

const crearUsuario = async (req, res) => {

    const {email, password} = req.body

    try {
        let usuario = Usuario.findOne({email})
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario registrado con el email ingresado'
            })
        }
        usuario = new Usuario(req.body)
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