require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Server is running')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vlhy1ml.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const alphahoodCollection = client.db('alphahood-login').collection('update-items')

        app.get('/items', async (req, res) => {
            const query = {}
            const result = await alphahoodCollection.findOne(query)
            res.send(result)
        })

        app.put('/item-text', async (req, res) => {
            const options = { upsert: true }
            const id = { _id: new ObjectId('6415d193bcf61804e7cafebf') }
            const textInfo = req.body
            const updateText = {
                $set: {
                    text: textInfo.text
                }
            }
            const result = await alphahoodCollection.updateOne(id, updateText, options)
            res.send(result)
        })

        app.put('/item-img', async (req, res) => {
            const options = { upsert: true }
            const id = { _id: new ObjectId('6415d193bcf61804e7cafebf') }
            const imgInfo = req.body
            const updateImg = {
                $set: {
                    img: imgInfo.img
                }
            }
            const result = await alphahoodCollection.updateOne(id, updateImg, options)
            res.send(result)
        })

    } catch (e) {
        console.log(e.message);
    }
}

run()

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))