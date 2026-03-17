import React from 'react';
import PageTransition from '../components/PageTransition';
import KPICard from '../components/KPICard';
import SensorChart from '../components/SensorChart';
import SensorDistribution from '../components/SensorDistribution';
import useSensorData from '../hooks/useSensorData';
import '../index.css'
function Dashboard() {
  const temp = useSensorData(25)
  const humidity = useSensorData(60)
  const light = useSensorData(400)

  return (
    <PageTransition>
      <div className='dashboard-grid'>


    <KPICard title='Temperature' {...temp}  unit='°C' icon='🌡' />
    <KPICard title='Humidity' {...humidity} unit='%' icon='💧' />
    <KPICard title='Light' {...light} unit='lux' icon='☀️' />

    <SensorChart data={temp.history}  title='Temperature (°C)' color='#D35400' />
    <SensorChart data={humidity.history} title='Humidity(%)'  color='#148F77' />


    <SensorDistribution>
        temp={temp.value}
        humidity={humidity.value}
        light={light.value}
    </SensorDistribution> 


      </div>
    </PageTransition>
  )
};

export default Dashboard;