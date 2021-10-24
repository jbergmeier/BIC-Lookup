const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()

const app = express()
const port = 3333 || process.env.PORT

app.use(cors())

// Routes
const bicLookup = require('./routes/bicLookup');
app.use('/getBic', bicLookup);


// Error Handler -- TEMP has to be changed!
app.use((err, req, res, next) => {
    console.error('StackTrace: ' + err.stack);
  
    res.status(500).json({
      message: 'An error has occured!',
      error: 'error',
      stack: process.env.NODE_ENV == 'development' ? err.stack : 'n/a',
    });
  });


  
// Starts Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})