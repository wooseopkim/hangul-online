const format = path => {
  const ext = path.substring(path.lastIndexOf('.') + 1)
  return {
    ttf: 'truetype',
    otf: 'opentype',
    woff: 'woff',
    woff2: 'woff2',
    eot: 'eot',
    svg: 'svg'
  }[ext] || 'unknown'
}

const whitespaces = /\s+/g
const none = ''

const generateCSS = (fontFamily, hostURL = '') => {
  const locals = Array.from(new Set([fontFamily.name.en, fontFamily.name.ko]
      .map(x => [x, x.replace(whitespaces, none)])
      .reduce((a, b) => a.concat(b), [])))
      .map(x => `local('${x}')`)
      .join(', ')

  const grouped = fontFamily.typefaces.reduce((a, b) => {
    const out = Object.assign({}, a)
    const weight = b.weight
    out[weight] = out[weight] || {}
    out[weight][b.path] = b.size
    return out
  }, {})

  const urls = weight => Object.keys(grouped[weight])
      .map(path => `url('${hostURL}/static/fonts/${path}') format('${format(path)}')`)
      .join(', ')

  const fontfaces = Object.keys(grouped).map(weight => `

@font-face {
  font-family: '${fontFamily.name.en}';
  src: ${locals}, ${urls(weight)};
  font-weight: ${weight};
  font-style: normal;
}

`.trim()).join('\n\n')

  const license = Object.keys(fontFamily.license)
      .sort()
      .map(key => fontFamily.license[key])
      .join('\n* ')

  const out = `

/*
* ${fontFamily.name.ko}
* ${fontFamily.name.en}
*
* ${license}
*/

${fontfaces}

.${fontFamily.name.en.toLowerCase().replace(whitespaces, '-')} {
  font-family: '${fontFamily.name.en}', ${fontFamily.fallback};
}

`.trim()

  return out
}

export {
  generateCSS
}
