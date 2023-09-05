const express = require('express');
const router = express.Router();

//getting all

router.get('/', (req, res) => {
    res.send("hello world!");
})

//getting one

router.get('/:id', (req, res) => {
    res.send(req.params.id);
})

router.post('/', (req, res) => {

})

router.patch('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;