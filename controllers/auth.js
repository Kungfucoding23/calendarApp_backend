const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt')

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
        
        const token = await generarJWT(usuario.id, usuario.name)
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, por favor intente de nuevo más tarde'
        })
    }
}

const loginUsuario = async (req, res) => {
    const {email, password} = req.body

    try {
        const usuario = await Usuario.findOne({email})          
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos'
            })
        }
        //confirmar la password
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }        
        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok: true,
            msg: 'Login correcto',
            uid: usuario.id,
            name: usuario.name,
            token

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, por favor intente de nuevo más tarde'
        })   
    }    
}

const revalidarToken = async (req, res) => {

    const uid = req.uid
    const name = req.name

    const nuevoToken = await generarJWT(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        nuevoToken
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}