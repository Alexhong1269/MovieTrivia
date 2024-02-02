const express = require("express");

//3001 is the port number we can replace it if we need to
const PORT = process.env.PORT || 3001;

const app = express();

//listening for a GET response from react
app.get("/api", (req,res) => {
    //we can change the message value or i think get rid of it
    res.json({message: "Hello from server!"});
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
