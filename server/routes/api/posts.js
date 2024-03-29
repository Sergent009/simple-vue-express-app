const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get Posts
router.get('/',async (req, res) => {
    const posts = await loadPostsCollection()
    res.send(await posts.find({}).toArray())
})


// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection()
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send()
})


// Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection()
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadPostsCollection(){
    // connecting to mongodb
    const client = await mongodb.MongoClient.connect
    ('mongodb://localhost:27017', {
        useNewUrlParser: true
    })

    return client.db('vue_express').collection('posts')
}

module.exports = router