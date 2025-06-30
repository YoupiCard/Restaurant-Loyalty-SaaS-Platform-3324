import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from '../../lib/i18n'

const { FiHome, FiStore, FiGift, FiBarChart3, FiSettings, FiLogOut, FiGlobe } = FiIcons

const Navbar = () => {
  const { userProfile, signOut } = useAuth()
  const { language, toggleLanguage } = useLanguage()
  const { t } = useTranslation(language)
  const location = useLocation()

  const navigation = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: FiHome },
    { name: t('nav.establishments'), href: '/establishments', icon: FiStore },
    { name: t('nav.rewards'), href: '/rewards', icon: FiGift },
    { name: t('nav.analytics'), href: '/analytics', icon: FiBarChart3 },
    { name: t('nav.settings'), href: '/settings', icon: FiSettings },
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiStore} className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RestaurantSaaS</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary-100 rounded-md -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiGlobe} className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userProfile?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{userProfile?.role?.replace('_', ' ')}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                <span className="hidden sm:block">{t('nav.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar