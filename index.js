  const http = require('http');
  const fs = require('fs')

  // Create an HTTP server
  const server = http.createServer((req, res) => {
    // Get the client's IP address
    const clientIP = getClientIP(req);
    console.log(clientIP)
    if (req.method === 'POST') {
      let body = '';

      // Collect data chunks from the request
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        // Your logic to handle the POST data
        console.log('Received POST data:', body);

        // Send a response
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('POST request received');
      });
    } else {
      // Send an HTML response with the client's IP
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile('./index.html', (err, html) => {
        res.end(html);
      })
    }
  });

  // Get the client's IP address from the request object
  function getClientIP(req) {
    const forwardedHeader = req.headers['x-forwarded-for'];
    if (forwardedHeader) {
      // If the request went through a proxy, use the forwarded IP
      return forwardedHeader.split(',')[0];
    } else {
      // Otherwise, use the remote address from the request object
      return req.connection.remoteAddress;
    }
  }

  // Specify the port number for the server to listen on
  const port = process.env.PORT || 3001;

  // Start the server and listen on the specified port
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
