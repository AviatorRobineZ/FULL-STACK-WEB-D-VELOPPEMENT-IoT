
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/sensors.json');

const getAllSensors = () => {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
};

const addSensor = (sensor) => {
  const sensors = getAllSensors();
  const newSensor = { id: Date.now(), ...sensor, createdAt: new Date() };
  sensors.push(newSensor);
  fs.writeFileSync(DATA_PATH, JSON.stringify(sensors, null, 2));
  return newSensor;
};

const deleteSensor = (id) => {
  const sensors = getAllSensors();
  const filtered = sensors.filter(s => s.id !== id);
  if (filtered.length === sensors.length) return false;
  fs.writeFileSync(DATA_PATH, JSON.stringify(filtered, null, 2));
  return true;
};

module.exports = { getAllSensors, addSensor, deleteSensor, updateSensor };