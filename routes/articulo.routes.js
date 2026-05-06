const express = require('express');
const router = express.Router();
const controller = require('../controller/articulo.controller');
const validate = require('../middleware/validate.middleware');
const articuloSchema = require('../schemas/articulo.schema');
const { asyncHandler } = require('../middleware/error.middleware');

router.get('/', asyncHandler(controller.getAll));
router.get('/:id', asyncHandler(controller.getById));
router.post('/', validate(articuloSchema.create), asyncHandler(controller.create));
router.put('/:id', validate(articuloSchema.update), asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));

module.exports = router;
