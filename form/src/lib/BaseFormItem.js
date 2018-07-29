export class BaseFormItem {
  constructor(value = '') {
    this._value = value;
    this._messages = [];
    this._validators = [];
    this._valueObservers = [];
    this._stateObservers = [];
    this._invalid = false;
    this._states = {
      dirty: false,
    };

    this._createObserver();
    return this;
  }

  get messages() {
    return this._messages;
  }

  get invalid() {
    return this._invalid;
  }

  get states() {
    return this._states;
  }

  addMessage(message) {
    if (this._messages.includes(message) === false) {
      this._messages.push(message);
    }
    this._updateState();
    return this;
  }

  removeMessage(message) {
    const index = this._messages.findIndex(_message => message === _message);
    if (index !== -1) {
      this._messages.splice(index, 1);
    }
    this._updateState();
    return this;
  }

  addValidator({ validator, message, stop = false }) {
    this._validators.push({
      validator,
      message,
      stop,
    });
    return this;
  }

  removeValidator({ message }) {
    const index = this._validators.findIndex(validator => {
      return validator.message === message;
    });
    if (index === -1) {
      return;
    }
    this._validators.splice(index, 1);
    this.removeMessage(message);
    return this;
  }

  validate() {
    for (const { validator, message, stop } of this._validators) {
      if (validator.call(this, this.value)) {
        this.removeMessage(message);
        continue;
      }
      this.addMessage(message);
      if (stop === true) {
        break;
      }
    }
    return this;
  }

  addValueObserver(observer) {
    this._valueObservers.push(value => {
      observer.call(this, value);
    });
    return this;
  }

  addStateObserver(observer) {
    this._stateObservers.push(value => {
      observer.call(null, value);
    });
    return this;
  }

  _updateState() {
    const invalid = this.messages.length > 0;
    if (invalid === this._invalid) {
      return;
    }
    this._invalid = invalid;
    this._notifyStateObservers(invalid);
  }

  _notifyStateObservers(invalid) {
    this._stateObservers.forEach(observer => {
      observer(invalid);
    });
  }

  _notifyValueObserver(value) {
    this._valueObservers.forEach(observer => {
      observer(value);
    });
  }

  _createObserver() {
    Object.defineProperty(this, 'value', {
      get() {
        return this._value;
      },
      set(value) {
        this._value = value;
        this.states.dirty = true;
        this.validate();
        this._notifyValueObserver(value);
      },
    });
  }
}
