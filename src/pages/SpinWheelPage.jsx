import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpinWheel from '../components/ui/SpinWheel'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../lib/i18n'

const SpinWheelPage = () => {
  const { establishmentId } = useParams()
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [establishment, setEstablishment] = useState(null)
  const [rewards, setRewards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEstablishmentData()
  }, [establishmentId])

  const fetchEstablishmentData = async () => {
    try {
      setLoading(true)
      
      // Fetch establishment
      const { data: establishmentData, error: establishmentError } = await supabase
        .from('establishments')
        .select('*')
        .eq('id', establishmentId)
        .eq('is_active', true)
        .single()

      if (establishmentError) throw establishmentError
      setEstablishment(establishmentData)

      // Fetch active rewards
      const { data: rewardsData, error: rewardsError } = await supabase
        .from('rewards')
        .select('*')
        .eq('establishment_id', establishmentId)
        .eq('is_active', true)
        .order('probability', { ascending: false })

      if (rewardsError) throw rewardsError
      setRewards(rewardsData || [])

    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSpin = async (selectedReward) => {
    try {
      // Update daily metrics
      const today = new Date().toISOString().split('T')[0]
      
      const { error } = await supabase
        .from('daily_metrics')
        .upsert({
          establishment_id: establishmentId,
          date: today,
          participations: 1
        }, {
          onConflict: 'establishment_id,date',
          ignoreDuplicates: false
        })

      if (error) throw error
    } catch (error) {
      console.error('Error updating metrics:', error)
    }
  }

  const handleRewardClaim = async (reward, email) => {
    try {
      // Create spinwheel session
      const { error: sessionError } = await supabase
        .from('spinwheel_sessions')
        .insert({
          establishment_id: establishmentId,
          customer_email: email,
          reward_id: reward.id,
          reward_claimed: true,
          session_data: {
            reward_title: language === 'fr' ? reward.title_fr : reward.title_en,
            reward_description: language === 'fr' ? reward.description_fr : reward.description_en,
            timestamp: new Date().toISOString()
          }
        })

      if (sessionError) throw sessionError

      // Update daily metrics
      const today = new Date().toISOString().split('T')[0]
      
      const { error: metricsError } = await supabase
        .from('daily_metrics')
        .upsert({
          establishment_id: establishmentId,
          date: today,
          rewards_claimed: 1
        }, {
          onConflict: 'establishment_id,date',
          ignoreDuplicates: false
        })

      if (metricsError) throw metricsError

      // Here you would typically send an email with the reward
      console.log('Reward claimed:', { reward, email })
      
    } catch (error) {
      console.error('Error claiming reward:', error)
      throw error
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !establishment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Établissement non trouvé</h1>
          <p className="text-gray-600">Cet établissement n'existe pas ou n'est plus actif.</p>
        </div>
      </div>
    )
  }

  if (!rewards.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Aucune récompense disponible</h1>
          <p className="text-gray-600">Cet établissement n'a pas encore configuré de récompenses.</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8 px-4"
      style={{
        '--primary-color': establishment.primary_color || '#ed7014',
        '--secondary-color': establishment.secondary_color || '#0ea5e9'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {establishment.logo_url && (
            <img
              src={establishment.logo_url}
              alt={establishment.name}
              className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg"
            />
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {establishment.name}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {language === 'fr' ? establishment.welcome_message_fr : establishment.welcome_message_en}
          </p>
          <div className="bg-white rounded-lg p-4 shadow-sm inline-block">
            <p className="text-lg font-medium text-gray-900">{t('spinwheel.title')}</p>
            <p className="text-gray-600">{t('spinwheel.subtitle')}</p>
          </div>
        </motion.div>

        {/* Spin Wheel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <SpinWheel
            rewards={rewards}
            onSpin={handleSpin}
            onRewardClaim={handleRewardClaim}
            establishment={establishment}
          />
        </motion.div>

        {/* Climbo Integration */}
        {establishment.climbo_embed_code && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Nos avis clients
            </h2>
            <div 
              className="w-full"
              dangerouslySetInnerHTML={{ __html: establishment.climbo_embed_code }}
            />
            {establishment.climbo_link && (
              <div className="text-center mt-4">
                <a
                  href={establishment.climbo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  <span>Répondre aux avis</span>
                </a>
              </div>
            )}
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-12 text-gray-500"
        >
          <p>Powered by RestaurantSaaS</p>
        </motion.div>
      </div>
    </div>
  )
}

export default SpinWheelPage