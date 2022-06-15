const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
const { exec } = require("child_process");
const path = require('path')

var public = path.join(__dirname, 'uploads');
// use it before all route definitions



// Create a new instance of express
const app = express()
app.use(cors())
// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.options('*', cors())

var vidCount = "1";

app.post('/download', (req, res) => {
    //console.log('Got body:', req.body);
    str = JSON.stringify(req.body);
    var result = JSON.parse(str);
    console.log( "Starting download of " + result.url)
    var finalUrl = result.url
    res.sendStatus(200);
    var currentVid = vidCount++;
    console.log(currentVid)

//%(title)s.%(ext)s

    exec('yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -P D:/YouTubeDownloaderHTML/express-app/uploads ' + finalUrl + " -o " + currentVid +  ".%(ext)s", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

});


// Tell our app to listen on port 3000
app.listen(3001, function (err) {
  if (err) {
    throw err
  }

  app.get('/uploads', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use('/uploads', express.static(public));

  console.log('Server started on port 3001')
})