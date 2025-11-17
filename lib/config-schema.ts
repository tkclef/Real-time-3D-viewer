// Configuration schema for cable customization
export interface CableConfig {
  cableLength: number
  wireColor: string
  connectorType: string
  plugType: string
  material: string
  lightingPreset: 'light' | 'dark' | 'glossy' | 'fabric' | 'metal'
  lightingIntensity: number
  lightingAngle: number
}

export const defaultConfig: CableConfig = {
  cableLength: 2,
  wireColor: 'black',
  connectorType: 'usb-c',
  plugType: 'standard',
  material: 'pvc',
  lightingPreset: 'dark',
  lightingIntensity: 1,
  lightingAngle: 45,
}

export const CABLE_LENGTHS = [1, 1.5, 2, 3, 5, 10]
export const WIRE_COLORS = ['black', 'white', 'red', 'blue', 'gold', 'silver']
export const CONNECTOR_TYPES = ['usb-c', 'usb-a', 'lightning', 'micro-usb']
export const PLUG_TYPES = ['standard', 'right-angle', 'flat']
export const MATERIALS = ['pvc', 'rubber', 'nylon', 'braided']
