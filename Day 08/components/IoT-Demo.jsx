import useSensorData from "../hooks/useSensorData"; 

const IoTDemo = () => {

  const temperature = useSensorData(25);
  const humidity    = useSensorData(60);

  return (
    <>
      <h1>IoT Demo</h1>
      <h2>Simulation IoT — Capteurs live</h2>

      <div className="sensors">
        <div className="sensor">
          <span> Température</span>
          <strong>{temperature.value}°C</strong> 
        </div>
        <div className="sensor">
          <span> Humidité</span>
          <strong>{humidity.value}%</strong>      
        </div>
      </div>

      <table>
        <thead>
          <tr><th>Heure</th><th>Temp (°C)</th><th>Humidité (%)</th></tr>
        </thead>
        <tbody>
          {temperature.history.map((row, i) => (
            <tr key={i}>
              <td>{row.time}</td>
              <td>{row.value}</td>
              <td>{humidity.history[i]?.value ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default IoTDemo;
