export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(data));
    }
  }

  on(event, fn) {
    this.events[event] = this.events[event] ? this.events[event].concat([fn]) : [fn];
  }
}
