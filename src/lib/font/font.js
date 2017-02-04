// this.path: File
// this.size: Number
// this.weight: Map<string, Number> => Tuple<string, Number>

export default {
  fromJSON: json => {
    if (typeof json === 'string') {
      json = JSON.parse(json)
    }
    return {
      path: json.path,
      size: json.size,
      weight: json.weight || {}
    }
  }
}
