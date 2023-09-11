const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')
//getting all

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

})

//getting one

router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
})

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(200).json(newSubscriber);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscriberToChannel != null) {
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne();
        res.send({ message: 'Subscriber removed' })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

async function getSubscriber(req, res, next) {
    let subsciber = null;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'No subscriber found' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;