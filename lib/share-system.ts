import { CableConfig, defaultConfig } from './config-schema'

export function generateShareLink(config: CableConfig): string {
  const encoded = btoa(JSON.stringify(config))
  return `${window.location.origin}?config=${encoded}`
}

export function loadConfigFromUrl(): CableConfig | null {
  const params = new URLSearchParams(window.location.search)
  const configParam = params.get('config')

  if (configParam) {
    try {
      const decoded = JSON.parse(atob(configParam))
      return { ...defaultConfig, ...decoded }
    } catch (e) {
      console.error('Failed to decode config:', e)
      return null
    }
  }

  return null
}
