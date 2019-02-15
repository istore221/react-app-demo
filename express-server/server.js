const express = require('express'),
      morgan = require('morgan'),
      compression = require('compression'),
      helmet = require('helmet'),
      path = require('path');



const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Enable Gzip
app.use(compression());

//protect your app from some well-known web vulnerabilities
app.use(helmet());

// Serve static assets
app.use(express.static(path.resolve(__dirname,'..','dist')));


//Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'..','dist','index.html'));
});

module.exports = app;
