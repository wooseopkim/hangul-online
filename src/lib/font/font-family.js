// this.name.en: string
// this.name.ko: string
// this.license.url: string
// this.license.text: string
// this.typefaces: Map<string, Font>

export default {
  fromJSON: (json) => {
    json = JSON.parse(json.toString())
    return {
      name: {
        en: json.name && json.name.en,
        ko: json.name && json.name.ko
      },
      fallback: json.fallback || '',
      license: {
        url: json.license && json.license.url,
        text: json.license && json.license.text
      },
      typefaces: json.typefaces || []
    }
  }
}
