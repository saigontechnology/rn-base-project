import I18n from 'i18n-js'
import en from './en'

export function configuration() {
  I18n.locale = 'en'
  I18n.fallbacks = true
  I18n.translations = {
    en: en,
  }
}

// I18n.missingTranslation = function (scope, options) {
//   return ''
// }

export function setLocale(locale) {
  I18n.locale = locale
}

export function getLocale() {
  return I18n.locale
}

export function localize(text, custom) {
  return I18n.t(text, custom)
}

export default I18n
