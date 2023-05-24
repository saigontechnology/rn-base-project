/* eslint-disable */
/**
 * @flow
 */
const path = require('path')
const fs = require('fs')
const argv = require('yargs-parser')(process.argv.slice(2))
// $FlowFixMe
String.prototype.format = function () {
  let a = this
  for (const k in arguments) {
    // $FlowFixMe
    a = a.replace(`{${k}}`.toRegex('g'), arguments[k])
  }
  return a
}
// $FlowFixMe
String.prototype.toRegex = function (option = 'i') {
  let regexStr = this.replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\]/g, '\\$&')
  regexStr = regexStr.replace(/\s/g, '\\s?')
  return new RegExp(regexStr, option)
}
const getFileName = file => {
  const fileNameMatch = file.match(/^(.+)\.[^\.]+$/)
  return (
    fileNameMatch &&
    fileNameMatch[1].toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
  )
}

const folder = argv.folder || argv.d || argv._[0]
const match = folder.match(/^(.+\/([^\/]+))\/?$/)
// $FlowFixMe
let output = match && '{0}/{1}.tsx'.format(match[1], match[2])
output = argv.output || argv.o || output
const outputMatch = output.match(/^(?:(.*)\/)?([^\/]+)$/)
const outputName = outputMatch[2]
const outputPath = outputMatch[1] || '.'
const requirePath = `./${path.relative(outputPath, folder)}`
const author = argv.author || argv.a || 'Robot'
const template = `/**
 * @flow
 */

const Images = {
{0}
}
export {Images}\n`

const moduleName = argv.name || getFileName(outputName)

const processFolder = (folderPath, prefix = '') => {
  const files = fs.readdirSync(folderPath)
  const strCodes = []
  files.forEach(file => {
    const filePath = path.join(folderPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      const subfolderPrefix = prefix ? `${prefix}/` : ''
      const subfolderPath = path.join(folderPath, file)
      const subfolderFiles = fs.readdirSync(subfolderPath)
      subfolderFiles.forEach(subfile => {
        const subfilePath = path.join(subfolderPath, subfile)
        const subfileName = getFileName(subfile)
        if (subfileName) {
          const subfileKey = `${subfolderPrefix}${subfileName}`
          const subfileRequirePath = path.relative(outputPath, subfilePath)
          strCodes.push(`  ${subfileKey}: require('./${subfileRequirePath}'),`)
        }
      })
    } else {
      const fileName = getFileName(file)
      if (fileName) {
        const fileKey = prefix ? `${prefix}/${fileName}` : fileName
        const fileRequirePath = path.relative(outputPath, filePath)
        strCodes.push(`  ${fileKey}: require('./${fileRequirePath}'),`)
      }
    }
  })
  const code = strCodes.join('\n')
  fs.writeFileSync(output, template.format(code, author))
}

processFolder(folder)
