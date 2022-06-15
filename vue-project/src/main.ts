import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from 'axios'
import qs from 'qs';

import App from "./App.vue";
import router from "./router";

const app = createApp(App);


app.use(createPinia());
app.use(router);

app.mount("#app");

const el = document.getElementById("video-input-button");
// @ts-ignore: Object is possibly 'null'.
el.addEventListener("click", download);

function download() {
  const vidurl = (<HTMLInputElement>document.getElementById("video-input"))
    .value;
  axios({
    method: "POST",
    url: "http://localhost:3001/download",
    data: qs.stringify({
      url: vidurl,
    }),
  });

  /*
      async function postData() {

        var vidurl = (<HTMLInputElement>document.getElementById("video-input")).value;
        try {

          // 👇️ const response: Response
        
          const response = await fetch('http://localhost:3001/download', {
            method: 'POST',
            body: ,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/x-www-form-urlencoded',
              'Access-Control-Allow-Origin': "*"
            },
          });
      
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          } else {
              console.log("sent post request!")
          }
       

        } catch (error) {
          if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
          } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
        }
      }
      
      postData();
    */
}
