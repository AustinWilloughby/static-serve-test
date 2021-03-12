//Import the serve-static and finalhandler libraries.
const serveStatic = require('serve-static');
const finalHandler = require('finalhandler');

//Import the base node http and url libraries.
const http = require('http');
const url = require('url');

//Import our own html handler.
const htmlHandler = require('./htmlHandler.js');


//Setup the serve object. This is going to make hosting routes for everything within the /assets folder.
const serve = serveStatic('assets');

//Setup the port.
const port = process.env.PORT || process.env.NODE_PORT || 3000;

//Create a quick lookup table for various file extensions that we want to serve.
const staticFileExtensions = ['jpg', 'jpeg', 'png'];

//For every request...
const onRequest = (request, response) => {
  //Parse the url.
  const parsedUrl = url.parse(request.url);
  
  //If the request is for a file type that we are static hosting (jpgs, png, etc).
  //To check this, we are grabbing the parsedUrl.pathname, and splitting it at the . in the url.
  //For example /test1.jpg, will split to ['/test1', 'jpg']. Looking at the second element (index 1)
  //we can determine the extension.
  if(staticFileExtensions.includes(parsedUrl.pathname.split('.')[1])){
    //Pass this into the serve handler made for us by the serve-static library.
    serve(request, response, finalHandler(request, response));
    
    //Otherwise, send back the html page.
  } else {
    htmlHandler.getIndex(request, response);
  }
}

//Create the server.
http.createServer(onRequest).listen(port);