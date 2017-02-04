let n = 0
const scale = 100
const iota = () => ++n * scale

const out = {
  THIN: iota(),
  XLIGHT: iota(),
  LIGHT: iota(),
  NORMAL: iota(),
  MEDIUM: iota(),
  SEMIBOLD: iota(),
  BOLD: iota(),
  XBOLD: iota(),
  BLACK: iota()
}

const alias = {
  THIN: ['HAIRLINE'],
  XLIGHT: ['EXTRALIGHT', 'ULTRALIGHT'],
  LIGHT: ['L'],
  NORMAL: ['R', 'REGULAR'],
  MEDIUM: ['M'],
  SEMIBOLD: ['DEMIBOLD'],
  BOLD: ['B'],
  XBOLD: ['EB', 'EXTRABOLD', 'ULTRABOLD'],
  BLACK: ['HEAVY']
}

for (const key in alias) {
  const names = alias[key]
  for (const name of names) {
    out[name] = out[key]
  }
}

const apply = function (s) {
  return out[s.toUpperCase()]
}

export default Object.freeze(Object.assign(apply, out))
