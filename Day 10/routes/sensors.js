const validateSensor = require("../middleware/validateSensor");
const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/sensorsController');

router.get('/',      controller.getAll);
router.get('/:id',   controller.getById);
router.post('/', validateSensor,   controller.create);
router.put('/:id', validateSensor,  controller.update);
router.delete('/:id',controller.remove);



module.exports = router;