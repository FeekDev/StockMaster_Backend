const express = require('express');
const router = express.Router();
const controller = require('../controller/venta.controller');
const validate = require('../middleware/validate.middleware');
const ventaSchema = require('../schemas/venta.schema');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(ventaSchema.create), controller.create);
router.put('/:id', validate(ventaSchema.update), controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
