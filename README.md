# socket8-js
It is a wrapper for using WebSocket client of JavaScript more conveniently.

socket8-js has the following functions.
- When the connection is disconnected, it will automatically reconnect
- When sending before connection or after disconnection, data is queued and waits for connection completion

## How to use
```javascript
sock = new Socket8('ws://localhost:8081', ['echo-protocol']);
sock.onopen(() => console.info('Connected.'));
sock.onclose(() => console.info('Closed.'));
sock.onerror(() => console.info('Error.'));
sock.onmessage(e => console.info(e.data);
sock.send('hello');
```

## How to run sample
```sh
$ npm install --save-dev
$ npm start
```
Open http://localhost:8080 in your web browser.
