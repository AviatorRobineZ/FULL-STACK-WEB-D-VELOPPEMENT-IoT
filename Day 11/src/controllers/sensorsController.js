const {getAllSensors, getSensorById, addSensor, updateSensor, deleteSensor} = require("../services/sensorService");

const getAll = (req, res, next) => {
  try {
    const sensors = getAllSensors();
    res.status(200).json({ success: true, data: sensors, count: sensors.length });
  } catch (err) {
    next(err); 
  }
};

const getById = (req, res, next) => {
  try {
    const sensor = getSensorById(req.params.id);

    if (!sensor) {
      return res.status(404).json({ success: false, error: 'Sensor not found' });
    }

    res.status(200).json({ success: true, data: sensor });
  } catch (err) {
    next(err);
  }
};



const create = (req, res, next) => {
  try {
    const { name, type, value, unit } = req.body;

    if (!name || !type) {
      return res.status(400).json({ success: false, error: 'name and type are required' });
    }

    const sensor = addSensor({ name, type, value, unit });
    res.status(201).json({ success: true, data: sensor });
  } catch (err) {
    next(err);
  }
};

const update = (req, res, next) => {
  try {
    const sensor = updateSensor(req.params.id, req.body);

    if (!sensor) {
      return res.status(404).json({ success: false, error: 'Sensor not found' });
    }

    res.status(200).json({ success: true, data: sensor });
  } catch (err) {
    next(err);
  }
};


const remove = (req, res, next) => {
  try {
    const deleted = deleteSensor(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Sensor not found' });
    }

    res.status(200).json({ success: true, message: 'Sensor deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {getAll, getById, create, update, remove};