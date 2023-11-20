const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000; // Change this to your desired port number

// Enable CORS for all routes
app.use(cors());

// Define the endpoint for downloading the file
app.get('/hello', (req, res) => {
    res.send("hello world!");
});

app.get('/download', (req, res) => {
    
  const filePath = './sketch.ino.bin'; // Change to your file's path
  const fileName = 'sketch.ino'; // Change to your desired file name


    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found.');
    }

    // Stream the file as the response
    const fileStream = fs.createReadStream(filePath);
    
    // Set the appropriate headers for the response
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=example.txt');

    // Pipe the file stream to the response
    fileStream.pipe(res);
    console.log("Serving file");

    // Handle any errors that may occur during streaming
    fileStream.on('error', (error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
