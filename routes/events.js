const {Router} = require('express')
const {validarJWT} = require('../middlewares/validar-jwt')
const { check } = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { getEvento, crearEvento, eliminarEvento, actualizarEvento } = require('../controllers/events')
const { isDate } = require('../helpers/isDate')
const router = Router()

/*
    Events routes
    /api/events
*/

router.use(validarJWT)

//obtener eventos
router.get('/', getEvento)

// crear un evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
)

//Actualizar evento
router.put('/:id', actualizarEvento)

//Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router