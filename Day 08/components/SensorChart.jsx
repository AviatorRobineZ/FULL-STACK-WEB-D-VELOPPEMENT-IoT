import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const SensorChart = React.memo(({ data, title, color }) => {
  return (
    <div className='chart-widget'>
      <h3>{title}</h3>
      <ResponsiveContainer width='100%' height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke='#eee' />
          <XAxis dataKey='time' tick={{ fontSize: 11 }} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip formatter={(v) => [v.toFixed(1), title]} />
          <Line
            type='monotone'
            dataKey='value'
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
})

export default SensorChart;