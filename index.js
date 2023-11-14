const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Get the client's IP address
  const clientIP = getClientIP(req);

  // Send an HTML response with the client's IP
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`<h1>Hello from Node.js!</h1><p>Your IP address is: ${clientIP}</p>`);
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
const port = 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
