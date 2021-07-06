
import { WebApp } from 'meteor/webapp'

// Docuss needs to access public/dcs-website.json from the browser, so we need
// to enable CORS on this page
// Enable CORS on any page
// WE SHOULD LIMIT THIS TO public/*.json
// https://enable-cors.org/server_meteor.html
WebApp.rawConnectHandlers.use(function(req, res, next) {
  console.log('WebApp.rawConnectHandlers');
  res.setHeader("Access-Control-Allow-Origin", "*"); // DUMMY
  res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type"); // DUMMY
  return next();
});
