const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');

router.post('/', bugController.createBug);
router.get('/', bugController.getBugs);
router.put('/:id', bugController.updateBug);     // ✅ Update status
router.delete('/:id', bugController.deleteBug);  // ✅ Delete bug

module.exports = router;

