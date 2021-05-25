const Evento = require('../models/Evento')

const getEvento = async (req, res) => {

    const eventos = await Evento.find().populate('user', 'name')


    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res) => {

    const evento = new Evento(req.body)

    try {
        evento.user = req.uid
        const eventoGuardado = await evento.save()
        res.status(201).json({
            ok: true,
            msg: 'evento guardado',
            eventoGuardado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal. Intente de nuevo más tarde'
        })
    }
}

const actualizarEvento = async (req, res) => {

    const eventoID = req.params.id
    const uid = req.uid

    try {
        
        const evento = await Evento.findById(eventoID)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento solicitado'    
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoID, nuevoEvento, {new: true})
        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, por favor intente más tarde'
        })
    }
}

const eliminarEvento = async (req, res) => {

    const eventoID = req.params.id
    const uid = req.uid

    try {
        
        const evento = await Evento.findById(eventoID)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento solicitado'    
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete(eventoID)
        res.status(200).json({
            ok: true,
            msg: 'Evento eliminado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, por favor intente más tarde'
        })
    }

}

module.exports = {
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}