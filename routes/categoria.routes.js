const express = require('express');
const router = express.Router();
const controller = require('../controller/categoria.controller');
const validate = require('../middleware/validate.middleware');
const categoriaSchema = require('../schemas/categoria.schema');
const { asyncHandler } = require('../middleware/error.middleware');

router.get('/', asyncHandler(controller.getAll));
router.get('/:id', asyncHandler(controller.getById));
router.post('/', validate(categoriaSchema.create), asyncHandler(controller.create));
router.put('/:id', validate(categoriaSchema.update), asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));

module.exports = router;
