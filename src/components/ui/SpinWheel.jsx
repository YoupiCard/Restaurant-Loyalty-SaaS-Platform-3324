import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from '../../lib/i18n'

const { FiRotateCw, FiMail, FiExternalLink, FiGift } = FiIcons

const SpinWheel = ({ rewards, onSpin, onRewardClaim, establishment }) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [email, setEmail] = useState('')
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef(null)
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ]

  const handleSpin = async () => {
    if (isSpinning || !rewards.length) return

    setIsSpinning(true)
    
    // Calculate random rotation (minimum 5 full rotations + random position)
    const minRotation = 1800 // 5 full rotations
    const randomRotation = Math.random() * 360
    const totalRotation = rotation + minRotation + randomRotation

    // Calculate which reward was selected
    const segmentAngle = 360 / rewards.length
    const normalizedAngle = (360 - (totalRotation % 360)) % 360
    const selectedIndex = Math.floor(normalizedAngle / segmentAngle)
    const reward = rewards[selectedIndex]

    setRotation(totalRotation)
    
    // Wait for animation to complete
    setTimeout(() => {
      setIsSpinning(false)
      setSelectedReward(reward)
      setShowRewardModal(true)
      onSpin?.(reward)
    }, 3000)
  }

  const handleClaimReward = async () => {
    if (!email || !selectedReward) return

    try {
      await onRewardClaim?.(selectedReward, email)
      setShowRewardModal(false)
      setEmail('')
      setSelectedReward(null)
    } catch (error) {
      console.error('Error claiming reward:', error)
    }
  }

  const segmentAngle = 360 / rewards.length

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
        </div>

        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          className="relative w-80 h-80 rounded-full border-8 border-gray-800 shadow-2xl overflow-hidden"
          style={{
            rotate: rotation
          }}
          transition={{
            duration: 3,
            ease: "cubicBezier(0.23, 1, 0.32, 1)"
          }}
        >
          {rewards.map((reward, index) => {
            const startAngle = index * segmentAngle
            const endAngle = (index + 1) * segmentAngle
            const midAngle = (startAngle + endAngle) / 2
            const color = colors[index % colors.length]

            return (
              <div
                key={reward.id}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `conic-gradient(from ${startAngle}deg, ${color} 0deg, ${color} ${segmentAngle}deg, transparent ${segmentAngle}deg)`,
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180)}%)`
                }}
              >
                <div
                  className="absolute text-white font-bold text-sm text-center"
                  style={{
                    transform: `rotate(${midAngle}deg) translateY(-120px) rotate(${-midAngle}deg)`,
                    width: '100px'
                  }}
                >
                  {language === 'fr' ? reward.title_fr : reward.title_en}
                </div>
              </div>
            )
          })}
          
          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiGift} className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spin Button */}
      <motion.button
        onClick={handleSpin}
        disabled={isSpinning}
        className={`px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg transition-all ${
          isSpinning
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105'
        }`}
        whileHover={!isSpinning ? { scale: 1.05 } : {}}
        whileTap={!isSpinning ? { scale: 0.95 } : {}}
      >
        <div className="flex items-center space-x-2">
          <SafeIcon 
            icon={FiRotateCw} 
            className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} 
          />
          <span>{isSpinning ? t('common.loading') : t('spinwheel.spin')}</span>
        </div>
      </motion.button>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiGift} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('spinwheel.congratulations')}
                </h3>
                <p className="text-gray-600 mb-4">{t('spinwheel.youWon')}</p>
                <div className="bg-primary-50 rounded-lg p-4 mb-6">
                  <h4 className="font-bold text-primary-900">
                    {language === 'fr' ? selectedReward.title_fr : selectedReward.title_en}
                  </h4>
                  <p className="text-primary-700 text-sm">
                    {language === 'fr' ? selectedReward.description_fr : selectedReward.description_en}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('spinwheel.emailPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleClaimReward}
                  disabled={!email}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiMail} className="w-4 h-4" />
                    <span>{t('spinwheel.claimReward')}</span>
                  </div>
                </button>

                <div className="flex space-x-3">
                  {establishment?.youpicard_loyalty_link && (
                    <a
                      href={establishment.youpicard_loyalty_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm"
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                        <span>{t('spinwheel.installCard')}</span>
                      </div>
                    </a>
                  )}
                  
                  {establishment?.climbo_link && (
                    <a
                      href={establishment.climbo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                        <span>{t('spinwheel.leaveReview')}</span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SpinWheel