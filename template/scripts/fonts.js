/**
 * @flow
 */

const fs = require('fs')
const fontFileNames = () => {
  const array = fs.readdirSync('src/assets/fonts').map(file => {
    return file.replace(/.ttf|.otf/gi, '')
  })
  return Array.from(new Set(array))
}
const generate = () => {
  // $FlowFixMe
  const properties = fontFileNames()
    .map(name => {
      const key = name
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
        .replace(new RegExp(/\w/), s => s.toUpperCase())
      return `${key}: '${name}'`
    })
    .join(',\n  ')

  const string = `const fonts = {
  ${properties},
}
export default fonts
`
  fs.writeFileSync('src/themes/fonts.js', string, 'utf8')
}
generate()
