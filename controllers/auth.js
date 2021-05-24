
const crearUsuario = (req, res) => {

    const {name, email, password} = req.body

    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    })
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