const http = require('http');
const geoip = require('geoip-lite');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Get the client's IP address
  const clientIP = getClientIP(req);

  // Use geoip-lite to get location information by IP
  const location = geoip.lookup(clientIP);

  // Send an HTML response with the client's IP and location information
  sendResponse(res, clientIP, location);
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

// Send an HTML response with the client's IP and location information
function sendResponse(res, clientIP, location) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  let responseHTML = `<h1>Hello from Node.js!</h1>`;
  responseHTML += `<p>Your IP address is: ${clientIP}</p>`;

  if (location) {
    responseHTML += `<p>Your location is: ${JSON.stringify(location)}</p>`;
  } else {
    responseHTML += `<p>Location information is not available.</p>`;
  }

  res.end(responseHTML);
}

// Specify the port number for the server to listen on
const port = process.env.PORT || 3001;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
