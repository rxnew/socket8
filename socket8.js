var Socket8 = function (url, protocol) {
  this.url = url;
  this.protocol = protocol;
  this._queue = [];
  this._errors = 0;
  this._onopen = () => {};
  this._onclose = () => {};
  this._onerror = () => {};
  this._onmessage = () => {};
  this._init();
};

Socket8.prototype.onopen = function (listener) {
  this._onopen = listener;
  this._sock.onopen = () => {
    this._onopen();
    while (this._queue.length > 0) {
      this._sock.send(this._queue.pop());
    }
    this._errors = 0;
  };
};

Socket8.prototype.onclose = function (listener) {
  this._onclose = listener;
  this._sock.onclose = () => {
    this._onclose();
    setTimeout(
      this._init.bind(this),
      Math.min(Math.max(this._errors - 1, 0), 10) * 1000
    );
  };
};

Socket8.prototype.onerror = function (listener) {
  this._onerror = listener;
  this._sock.onerror = () => {
    this._onerror();
    ++this._errors;
  };
};

Socket8.prototype.onmessage = function (listener) {
  this._onmessage = listener;
  this._sock.onmessage = listener;
};

Socket8.prototype.send = function (data) {
  if (this._sock.readyState !== 1) {
    this._queue.push(data);
  } else {
    this._sock.send(data);
  }
};

Socket8.prototype.close = function () {
  this._sock.close();
};

Socket8.prototype._init = function () {
  this._sock = new WebSocket(this.url, this.protocol);
  this.onopen(this._onopen);
  this.onclose(this._onclose);
  this.onerror(this._onerror);
  this.onmessage(this._onmessage);
};
