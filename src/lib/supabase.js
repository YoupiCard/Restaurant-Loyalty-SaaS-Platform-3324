import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema helper functions
export const dbSchema = {
  // Users table
  users: {
    id: 'uuid',
    email: 'text',
    role: 'text', // 'superadmin', 'group_admin', 'restaurant_manager'
    group_id: 'uuid',
    establishment_id: 'uuid',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  },

  // Groups table (for restaurant chains)
  groups: {
    id: 'uuid',
    name: 'text',
    subscription_plan: 'text', // 'basic', 'elite'
    stripe_customer_id: 'text',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  },

  // Establishments table
  establishments: {
    id: 'uuid',
    group_id: 'uuid',
    name: 'text',
    logo_url: 'text',
    primary_color: 'text',
    secondary_color: 'text',
    climbo_embed_code: 'text',
    climbo_link: 'text',
    youpicard_loyalty_link: 'text',
    youpicard_coupon_link: 'text',
    welcome_message_fr: 'text',
    welcome_message_en: 'text',
    thank_you_message_fr: 'text',
    thank_you_message_en: 'text',
    qr_code_url: 'text',
    is_active: 'boolean',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  },

  // Rewards table
  rewards: {
    id: 'uuid',
    establishment_id: 'uuid',
    type: 'text', // 'discount', 'free_item', 'points', 'custom'
    title_fr: 'text',
    title_en: 'text',
    description_fr: 'text',
    description_en: 'text',
    value: 'text',
    probability: 'integer', // 1-100
    email_template_fr: 'text',
    email_template_en: 'text',
    is_active: 'boolean',
    created_at: 'timestamp'
  },

  // Spinwheel sessions table
  spinwheel_sessions: {
    id: 'uuid',
    establishment_id: 'uuid',
    customer_email: 'text',
    reward_id: 'uuid',
    reward_claimed: 'boolean',
    google_review_completed: 'boolean',
    youpicard_installed: 'boolean',
    session_data: 'jsonb',
    created_at: 'timestamp'
  },

  // Daily metrics table
  daily_metrics: {
    id: 'uuid',
    establishment_id: 'uuid',
    date: 'date',
    qr_scans: 'integer',
    participations: 'integer',
    rewards_claimed: 'integer',
    google_reviews: 'integer',
    youpicard_installs: 'integer',
    created_at: 'timestamp'
  }
}