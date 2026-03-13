import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const SensorDistribution = ({ temp, humidity, light }) => {
  const data = [
    { name: 'Température', value: Math.round(temp),       fill: '#D35400' },
    { name: 'Humidité',    value: Math.round(humidity),   fill: '#148F77' },
    { name: 'Luminosité',  value: Math.round(light / 10), fill: '#D4AC0D' },
  ]

  const alerts = [
    temp > 30     && { msg: '🌡 Temperature too high!', level: 'warning' },
    humidity > 75 && { msg: '💧 Humidity too high!',    level: 'danger' },
  ].filter(Boolean)

  return (
    <div className='chart-widget'>
      <h3>Distribution</h3>

      {alerts.map((a, i) => (
        <div key={i} className={`alert alert-${a.level}`}>
          {a.msg}
        </div>
      ))}

      <ResponsiveContainer width='100%' height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            cx='50%'
            cy='50%'
            outerRadius={70}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SensorDistribution;