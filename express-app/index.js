const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
const { exec } = require("child_process");
const path = require('path')
const getVideoId = require('get-video-id');
const urlParser = require ('js-video-url-parser');
var serveIndex = require('serve-index');

var public = path.join(__dirname, 'uploads');
// use it before all route definitions



// Create a new instance of express
const app = express()
app.use(cors())
// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.options('*', cors())

//var vidCount = "1";

app.post('/download', (req, res) => {
    //console.log('Got body:', req.body);
    str = JSON.stringify(req.body);
    var result = JSON.parse(str);
    //console.log( "Starting download of " + result.url)
    var finalUrl = result.url
    //console.log('url = ' + finalUrl)
    res.sendStatus(200);
    //var currentVid = vidCount++;
    //console.log(currentVid)
    const folder_name = result.folder;
    //console.log(folder_name)
    

    const id = result.id;
    console.log(id)

//%(title)s.%(ext)s
    
    function download() {
        //const folder_id = (getRandomInt(2000))
        const video_id = id;
        var serverPath = path.resolve(process.cwd() + '/../express-app/uploads');
        console.log(serverPath) 

        exec('yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -P "' + serverPath + '" ' + finalUrl + ' -o ' +  video_id + ".%(ext)s", (error, stdout, stderr) => {
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
    }

    download();

      /* 
      videoID = "113123344"

    //exec('yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -P ' + folder_name +  ' ' + finalUrl + " -o " + currentVid +  ".%(ext)s", (error, stdout, stderr) => {
      exec('yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" -P "' + folder_name + '/' +  videoID + '" ' + finalUrl + ' -o ' + videoID +  ".%(ext)s", (error, stdout, stderr) => {
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

    */

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