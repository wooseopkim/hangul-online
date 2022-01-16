import { ncp } from 'ncp'

const stop = (err) => {
  if (err) throw err
}
ncp('../../assets/fonts', '../../../public/static/fonts', stop)
ncp('../../assets/css', '../../../public/static/css', stop)
