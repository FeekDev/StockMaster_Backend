const express = require('express');
const router = express.Router();
const controller = require('../controller/detalleFactura.controller');
const validate = require('../middleware/validate.middleware');
const detalleFacturaSchema = require('../schemas/detalleFactura.schema');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validate(detalleFacturaSchema.create), controller.create);
router.put('/:id', validate(detalleFacturaSchema.update), controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
