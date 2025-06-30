export const generateRewardEmail = (reward, establishment, language = 'fr') => {
  const templates = {
    fr: {
      subject: `🎉 Votre récompense de ${establishment.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            ${establishment.logo_url ? `<img src="${establishment.logo_url}" alt="${establishment.name}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 20px;">` : ''}
            <h1 style="color: #333; margin: 0;">${establishment.name}</h1>
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
            <h2 style="margin: 0 0 10px 0;">🎉 Félicitations !</h2>
            <p style="margin: 0; font-size: 18px;">Vous avez gagné une récompense !</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
            <h3 style="color: #333; margin-top: 0;">${reward.title_fr}</h3>
            <p style="color: #666; margin-bottom: 0;">${reward.description_fr}</p>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <p style="color: #666;">Présentez cet email en magasin pour récupérer votre récompense</p>
          </div>
          
          ${establishment.youpicard_loyalty_link ? `
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="${establishment.youpicard_loyalty_link}" style="display: inline-block; background: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                📱 Installer la carte de fidélité
              </a>
            </div>
          ` : ''}
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
            <p>Merci de votre participation !</p>
            <p>Powered by RestaurantSaaS</p>
          </div>
        </div>
      `
    },
    en: {
      subject: `🎉 Your reward from ${establishment.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            ${establishment.logo_url ? `<img src="${establishment.logo_url}" alt="${establishment.name}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 20px;">` : ''}
            <h1 style="color: #333; margin: 0;">${establishment.name}</h1>
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
            <h2 style="margin: 0 0 10px 0;">🎉 Congratulations!</h2>
            <p style="margin: 0; font-size: 18px;">You won a reward!</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
            <h3 style="color: #333; margin-top: 0;">${reward.title_en}</h3>
            <p style="color: #666; margin-bottom: 0;">${reward.description_en}</p>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <p style="color: #666;">Show this email in store to claim your reward</p>
          </div>
          
          ${establishment.youpicard_loyalty_link ? `
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="${establishment.youpicard_loyalty_link}" style="display: inline-block; background: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                📱 Install loyalty card
              </a>
            </div>
          ` : ''}
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 14px;">
            <p>Thank you for participating!</p>
            <p>Powered by RestaurantSaaS</p>
          </div>
        </div>
      `
    }
  }
  
  return templates[language] || templates.fr
}

export const sendRewardEmail = async (email, reward, establishment, language = 'fr') => {
  const template = generateRewardEmail(reward, establishment, language)
  
  // In a real implementation, you would use a service like:
  // - SendGrid
  // - Mailgun  
  // - AWS SES
  // - Supabase Edge Functions
  
  console.log('Sending email to:', email)
  console.log('Subject:', template.subject)
  console.log('HTML:', template.html)
  
  // Simulated email sending
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, messageId: 'sim-' + Date.now() })
    }, 1000)
  })
}