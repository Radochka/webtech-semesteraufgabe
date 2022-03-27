const app = require('./app')
const port = process.env.PORT || 5000

//server starten
app.listen(port, () => console.log(`Server has been gestartet on ${port}`))