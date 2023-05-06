import {I18n} from 'i18n-js'
import en from './en'

const i18n = new I18n({
  en: en,
})

i18n.defaultLocale = 'en'
i18n.enableFallback = true

i18n.missingTranslation = function (scope, options) {
  return ''
}

export function setLocale(locale) {
  i18n.locale = locale
}

export function getLocale() {
  return i18n.locale
}

export function localize(text, custom) {
  return i18n.t(text, custom)
}

export default i18n
