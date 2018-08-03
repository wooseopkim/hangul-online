import { ncp } from 'ncp'

const stop = err => { if (err) throw err }
ncp('../../assets/fonts', '../../../static/fonts', stop)
ncp('../../assets/css', '../../../static/css', stop)
