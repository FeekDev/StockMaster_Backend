const express = require('express');
const router = express.Router();
const controller = require('../controller/persona.controller');
const validate = require('../middleware/validate.middleware');
const personaSchema = require('../schemas/persona.schema');
const { asyncHandler } = require('../middleware/error.middleware');

router.get('/', asyncHandler(controller.getAll));
router.get('/:id', asyncHandler(controller.getById));
router.post('/', validate(personaSchema.create), asyncHandler(controller.create));
router.put('/:id', validate(personaSchema.update), asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));

module.exports = router;
