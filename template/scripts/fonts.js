/**
 * @flow
 */

const fs = require('fs')
const fontFileNames = () => {
  const array = fs.readdirSync('src/assets/fonts').map(file => {
    return file.replace('.ttf', '')
  })
  return Array.from(new Set(array))
}
const generate = () => {
  // $FlowFixMe
  const properties = fontFileNames()
    .map(name => {
      const key = name.toUpperCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      return `${key}: '${name}'`
    })
    .join(',\n  ')

  console.log('properties', properties)
  const string = `const fonts = {
  ${properties}
}
export default fonts
`
  fs.writeFileSync('src/assets/fonts.js', string, 'utf8')
}
generate()
