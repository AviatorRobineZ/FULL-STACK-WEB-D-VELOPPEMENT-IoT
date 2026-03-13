import { motion } from 'framer-motion'
import React from 'react'

const KPICard = React.memo(({ title, value, trend, unit, icon }) => {
  const trendIcon = { up: '↑', down: '↓', stable: '—' }[trend]
  const trendColor = { up: '#D35400', down: '#148F77', stable: '#888' }[trend]

  return (
    <motion.div
      className='kpi-card'
      whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}
    >
      <span className='kpi-icon'>{icon}</span>
      <h3 className='kpi-title'>{title}</h3>

      
      <motion.p
        className='kpi-value'
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {value} <span className='kpi-unit'>{unit}</span>
      </motion.p>

      <span style={{ color: trendColor }}>
        {trendIcon} {trend}
      </span>
    </motion.div>
  )
})

export default KPICard