import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import StatCard from '../components/ui/StatCard'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../lib/i18n'
import { supabase } from '../lib/supabase'

const { FiQrCode, FiUsers, FiGift, FiStar, FiCreditCard, FiTrendingUp } = FiIcons

const Dashboard = () => {
  const { userProfile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [stats, setStats] = useState({
    qrScans: 0,
    participations: 0,
    rewards: 0,
    reviews: 0,
    youpicard: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [userProfile])

  const fetchDashboardStats = async () => {
    if (!userProfile) return

    try {
      setLoading(true)
      
      // Get establishments based on user role
      let establishmentIds = []
      
      if (userProfile.role === 'superadmin') {
        const { data: establishments } = await supabase
          .from('establishments')
          .select('id')
        establishmentIds = establishments?.map(e => e.id) || []
      } else if (userProfile.role === 'group_admin') {
        const { data: establishments } = await supabase
          .from('establishments')
          .select('id')
          .eq('group_id', userProfile.group_id)
        establishmentIds = establishments?.map(e => e.id) || []
      } else {
        establishmentIds = [userProfile.establishment_id]
      }

      // Fetch today's metrics
      const today = new Date().toISOString().split('T')[0]
      const { data: metrics } = await supabase
        .from('daily_metrics')
        .select('*')
        .in('establishment_id', establishmentIds)
        .eq('date', today)

      // Aggregate stats
      const aggregatedStats = metrics?.reduce((acc, metric) => ({
        qrScans: acc.qrScans + (metric.qr_scans || 0),
        participations: acc.participations + (metric.participations || 0),
        rewards: acc.rewards + (metric.rewards_claimed || 0),
        reviews: acc.reviews + (metric.google_reviews || 0),
        youpicard: acc.youpicard + (metric.youpicard_installs || 0)
      }), {
        qrScans: 0,
        participations: 0,
        rewards: 0,
        reviews: 0,
        youpicard: 0
      }) || stats

      setStats(aggregatedStats)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: t('dashboard.qrScans'),
      value: stats.qrScans,
      icon: FiQrCode,
      color: 'primary',
      trend: { positive: true, value: 12 }
    },
    {
      title: t('dashboard.participations'),
      value: stats.participations,
      icon: FiUsers,
      color: 'secondary',
      trend: { positive: true, value: 8 }
    },
    {
      title: t('dashboard.rewards'),
      value: stats.rewards,
      icon: FiGift,
      color: 'green',
      trend: { positive: true, value: 15 }
    },
    {
      title: t('dashboard.reviews'),
      value: stats.reviews,
      icon: FiStar,
      color: 'yellow',
      trend: { positive: true, value: 5 }
    },
    {
      title: t('dashboard.youpicard'),
      value: stats.youpicard,
      icon: FiCreditCard,
      color: 'purple',
      trend: { positive: true, value: 20 }
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-600 mt-2">
            {t('common.welcome')}, {userProfile?.email}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FiTrendingUp className="w-4 h-4" />
          <span>{t('dashboard.todayStats')}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all"
          >
            Nouvel établissement
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-medium hover:from-secondary-600 hover:to-secondary-700 transition-all"
          >
            Configurer récompenses
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
          >
            Voir les analyses
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
