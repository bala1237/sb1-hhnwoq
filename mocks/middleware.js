const { readFileSync } = require('fs');
const path = require('path');

function flattenRoutes(routes, prefix = '') {
  return Object.entries(routes).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      // This is a route mapping
      acc[prefix + key] = value;
    } else {
      // This is a nested object, recurse
      return { ...acc, ...flattenRoutes(value, prefix) };
    }
    return acc;
  }, {});
}

module.exports = (req, res, next) => {
  // Add CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  
  // Load and parse routes.json
  const routesPath = path.join(__dirname, 'routes.json');
  const routes = JSON.parse(readFileSync(routesPath, 'utf8'));
  
  // Flatten routes for JSON Server
  const flatRoutes = flattenRoutes(routes);
  
  // Add flattened routes to req object for JSON Server to use
  req.routes = flatRoutes;
  
  next();
};
