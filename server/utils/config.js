require('dotenv').config()

const PORT = process.env.PORT

// Baza podataka
const password = process.env.ATLAS_PASS
const user = process.env.ATLAS_USER
const dbname = process.env.NODE_ENV === 'test' ? 'newevents-api-test' : 'newevents-api'
const DB_URI = `mongodb+srv://${user}:${password}@cluster0.xx26clt.mongodb.net/${dbname}?retryWrites=true&w=majority`

module.exports = {PORT, DB_URI}