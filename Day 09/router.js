
const { getAllSensors, addSensor, deleteSensor, updateSensor } = require('./controllers/sensors');
const parseBody = require('./utils/parseBody');

const router = async (req, res) => {
  const pathname = req.url.split('?')[0];
  const method = req.method;

  // GET all sensors
  if (pathname === '/api/sensors' && method === 'GET') {
    const sensors = getAllSensors();
    return res.end(JSON.stringify(sensors));
  }

  // POST new sensor
  else if (pathname === '/api/sensors' && method === 'POST') {
    try {
      const body = await parseBody(req);
      const newSensor = addSensor(body);
      res.writeHead(201);
      return res.end(JSON.stringify(newSensor));
    } catch (err) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  // DELETE sensor by ID
  else if (pathname.startsWith('/api/sensors/') && method === 'DELETE') {
    const id = parseInt(pathname.split('/')[3]);
    const success = deleteSensor(id);
    if (success) return res.end(JSON.stringify({ message: 'Sensor deleted' }));
    res.writeHead(404);
    return res.end(JSON.stringify({ error: 'Sensor not found' }));
  }

  // PUT update sensor by ID
  else if (pathname.startsWith('/api/sensors/') && method === 'PUT') {
    const id = parseInt(pathname.split('/')[3]);
    try {
      const body = await parseBody(req);
      const updated = updateSensor(id, body);
      if (updated) return res.end(JSON.stringify(updated));
      res.writeHead(404);
      return res.end(JSON.stringify({ error: 'Sensor not found' }));
    } catch (err) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  // Unknown route
  else {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: 'Route not found' }));
  }
};

module.exports = router;