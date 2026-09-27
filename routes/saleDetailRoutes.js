const express = require('express');
const router = express.Router();
const saleDetailController = require('../controllers/saleDetailController');

router.get('/', saleDetailController.getAll);
router.get('/:id', saleDetailController.getById);
router.post('/', saleDetailController.create);
router.put('/:id', saleDetailController.update);
router.delete('/:id', saleDetailController.remove);

module.exports = router;
