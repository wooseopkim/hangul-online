// https://v3.vuejs.org/guide/migration/events-api.html#event-bus
import emitter from 'tiny-emitter/instance'

export default {
  $on: (...args: any[]): void => emitter.on(...args),
  $once: (...args: any[]): void => emitter.once(...args),
  $off: (...args: any[]): void => emitter.off(...args),
  $emit: (...args: any[]): void => emitter.emit(...args)
}
