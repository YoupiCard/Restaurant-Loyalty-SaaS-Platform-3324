import React from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'

const StatCard = ({ title, value, icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-100',
    secondary: 'text-secondary-600 bg-secondary-100',
    green: 'text-green-600 bg-green-100',
    red: 'text-red-600 bg-red-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    purple: 'text-purple-600 bg-purple-100'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '+' : ''}{trend.value}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <SafeIcon icon={icon} className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

export default StatCard