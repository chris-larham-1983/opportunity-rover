//Express server
const express = require('express');
const app = express();
//front-end <--> back-end communication
const cors = require('cors');
//define port
const PORT = process.env.PORT || 5000;
//facilitate the joining of directory paths together
const path = require('path');

//middleware
app.use(cors()); //allows the front end to communicate with the back end (REACT <--> NODE)

//facilitate access to req.body and allow stripe payment details to be sent to POST /webhook endpoint
app.use(express.json({
    verify: (req, res, buffer) => req['rawBody'] = buffer,
}));

//ensure correct directory paths in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

//ROUTES:

//add manifest items to Opportunity database
app.use("/manifest", require("./routes/manifest"));
//photos route
app.use("/photos", require("./routes/photos"));

//display pages correctly when the page is refreshed
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//start server
app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}.`);
});