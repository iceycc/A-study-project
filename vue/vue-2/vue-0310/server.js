let express = require('express')
let app = express()
let VueServerRenderer = require('vue-server-renderer')
let Vue = require('vue')

let vm = new Vue({
  template:'<div>hello world</div>'
})
let render = VueServerRenderer.createBundleRenderer()
app.get('/',(res,req)=>{
  render.renderToString(vm,function(err,html){
    res.send(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>vue-0310</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but vue-0310 doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    ${html}
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

    `)
  })})

app.listen(3000)