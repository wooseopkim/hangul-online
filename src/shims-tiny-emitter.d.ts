/* eslint-disable */
declare module 'tiny-emitter/instance' {
  type Bus = {
    on: (...args) => void;
    once: (...args) => void;
    off: (...args) => void;
    emit: (...args) => void;
  }
  const bus: Bus;
  export default bus;
}
