import QRCode from 'react-qr-code'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const generateQRCode = (establishmentId, baseUrl = window.location.origin) => {
  return `${baseUrl}/#/spin/${establishmentId}`
}

export const downloadQRCode = async (establishmentId, establishmentName) => {
  const qrUrl = generateQRCode(establishmentId)
  
  // Create a temporary div to render the QR code
  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'absolute'
  tempDiv.style.left = '-9999px'
  tempDiv.style.padding = '20px'
  tempDiv.style.backgroundColor = 'white'
  tempDiv.style.textAlign = 'center'
  
  // Add QR code and text
  tempDiv.innerHTML = `
    <div style="font-family: Arial, sans-serif; text-align: center;">
      <h2 style="margin-bottom: 20px; color: #333;">${establishmentName}</h2>
      <div id="qr-code" style="margin: 20px 0;"></div>
      <p style="margin-top: 20px; color: #666;">Scannez pour participer au jeu</p>
      <p style="color: #666;">Scan to play the game</p>
    </div>
  `
  
  document.body.appendChild(tempDiv)
  
  // Render QR code
  const qrContainer = tempDiv.querySelector('#qr-code')
  const qrElement = document.createElement('div')
  qrContainer.appendChild(qrElement)
  
  // Use react-qr-code to generate the QR
  const qrCodeSvg = `
    <svg width="200" height="200" viewBox="0 0 200 200">
      <QRCode value="${qrUrl}" size={200} />
    </svg>
  `
  qrElement.innerHTML = qrCodeSvg
  
  try {
    // Convert to canvas
    const canvas = await html2canvas(tempDiv, {
      backgroundColor: 'white',
      scale: 2
    })
    
    // Create PDF
    const pdf = new jsPDF()
    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 190
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight)
    pdf.save(`qr-code-${establishmentName.replace(/\s+/g, '-').toLowerCase()}.pdf`)
    
  } catch (error) {
    console.error('Error generating QR code:', error)
    
    // Fallback: create a simple downloadable link
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = `qr-code-${establishmentName}.txt`
    link.click()
  } finally {
    // Clean up
    document.body.removeChild(tempDiv)
  }
}

export const copyQRLink = (establishmentId) => {
  const qrUrl = generateQRCode(establishmentId)
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(qrUrl)
    return true
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = qrUrl
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return true
  }
}