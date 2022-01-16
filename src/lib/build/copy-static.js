import * as ncp from 'ncp'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const stop = (err) => {
  if (err) throw err
}
ncp.default(`${dirname}/../../assets/fonts`, `${dirname}/../../../public/static/fonts`, stop)
ncp.default(`${dirname}/../../assets/css`, `${dirname}/../../../public/static/css`, stop)
