export class FormObserver {
  constructor(names = []) {
    this._names = names;
    this._results = {};
    this.hasError = true;

    this._initializeResults();
  }

  setResult(name, result) {
    this._results[name] = result;
    if (result === true) {
      this.hasError = this._hasErrorResults();
    } else {
      this.hasError = true;
    }
  }

  _initializeResults() {
    for (const name of this._names) {
      this._results[name] = false;
    }
  }

  _hasErrorResults() {
    return Object.keys(this._results).some(name => !this._results[name]);
  }
}
