import { CableConfig } from './config-schema'

export async function generatePDF(config: CableConfig) {
  try {
    // Dynamic import to avoid loading unless needed
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default

    // Create a temporary container for rendering
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = '-9999px'
    container.style.top = '-9999px'
    container.style.width = '800px'
    container.style.backgroundColor = 'white'
    container.style.padding = '40px'
    container.style.fontFamily = 'Arial, sans-serif'

    const timestamp = new Date().toLocaleDateString()
    const configSummary = `
      <h1 style="margin-bottom: 30px; color: #333;">Cable Configuration</h1>
      <div style="margin-bottom: 20px;">
        <p style="margin: 8px 0;"><strong>Generated:</strong> ${timestamp}</p>
      </div>
      
      <h2 style="margin-top: 30px; margin-bottom: 15px; font-size: 18px; color: #444;">Configuration Details</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Cable Length</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${config.cableLength}m</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Wire Color</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-transform: capitalize;">${config.wireColor}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Connector Type</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-transform: capitalize;">${config.connectorType}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Plug Type</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-transform: capitalize;">${config.plugType}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Material</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-transform: capitalize;">${config.material}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Lighting Preset</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; text-transform: capitalize;">${config.lightingPreset}</td>
        </tr>
      </table>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">
        <p>This configuration was created with the 3D Cable Configurator</p>
      </div>
    `

    container.innerHTML = configSummary
    document.body.appendChild(container)

    // Capture the container as image
    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: '#ffffff',
    })

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // Add title
    pdf.setFontSize(24)
    pdf.setTextColor(51, 51, 51)
    pdf.text('Cable Configuration', 20, 20)

    // Add generated date
    pdf.setFontSize(10)
    pdf.setTextColor(100, 100, 100)
    pdf.text(`Generated: ${timestamp}`, 20, 30)

    // Add configuration table
    pdf.setFontSize(12)
    pdf.setTextColor(68, 68, 68)
    pdf.text('Configuration Details:', 20, 45)

    const tableData = [
      ['Cable Length', `${config.cableLength}m`],
      ['Wire Color', config.wireColor.charAt(0).toUpperCase() + config.wireColor.slice(1)],
      ['Connector Type', config.connectorType.charAt(0).toUpperCase() + config.connectorType.slice(1)],
      ['Plug Type', config.plugType.charAt(0).toUpperCase() + config.plugType.slice(1)],
      ['Material', config.material.charAt(0).toUpperCase() + config.material.slice(1)],
      ['Lighting', config.lightingPreset.charAt(0).toUpperCase() + config.lightingPreset.slice(1)],
    ]

    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0)

    let yOffset = 55
    tableData.forEach(([label, value], index) => {
      if (index % 2 === 0) {
        pdf.setFillColor(245, 245, 245)
        pdf.rect(20, yOffset - 4, pageWidth - 40, 7, 'F')
      }
      pdf.text(label + ':', 25, yOffset)
      pdf.text(value, pageWidth - 60, yOffset)
      yOffset += 10
    })

    // Add footer
    pdf.setFontSize(8)
    pdf.setTextColor(150, 150, 150)
    pdf.text('3D Cable Configurator', 20, pageHeight - 10)

    // Save the PDF
    pdf.save(`cable-config-${Date.now()}.pdf`)

    // Cleanup
    document.body.removeChild(container)
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

export function generateShareLink(config: CableConfig): string {
  const encoded = btoa(JSON.stringify(config))
  return `${window.location.origin}?config=${encoded}`
}
