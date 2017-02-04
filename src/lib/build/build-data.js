import * as fs from 'fs'
import * as path from 'path'
import {fontFamily, weight} from '../font'
import {generateCSS} from '../stylesheet'

const assets = '../../assets'

const fontDataFile = 'data.json'
const fontsRoot = `${assets}/fonts`
const outFonts = []
const outFontsPath = `${fontsRoot}/${fontDataFile}`

fs.readdirSync(fontsRoot).filter(file => {
  return fs.statSync(`${fontsRoot}/${file}`).isDirectory()
}).forEach(dir => {
  const ff = fontFamily.fromJSON(fs.readFileSync(`${fontsRoot}/${dir}/${fontDataFile}`))

  fs.readdirSync(`${fontsRoot}/${dir}`).filter(file => {
    return file !== fontDataFile
  }).forEach(file => {
    const basename = path.basename(file, path.extname(file))
    const weightName = basename.substring(basename.lastIndexOf('-') + 1)
    const weightValue = weight(weightName)
    const filePath = `${dir}/${file}`
    ff.typefaces.push({
      path: filePath,
      size: fs.statSync(`${fontsRoot}/${filePath}`).size,
      weight: weightValue
    })
  })

  outFonts.push(ff)
})

fs.writeFileSync(outFontsPath, JSON.stringify(outFonts, null, 2))

const cssFile = 'fonts.css'
const cssRoot = `${assets}/css`
const outCssPath = `${cssRoot}/${cssFile}`

const outCss = outFonts.map(fontFamily => generateCSS(fontFamily)).join('\n\n')

fs.writeFileSync(outCssPath, outCss)
