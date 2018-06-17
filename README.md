proxy-object-defaults
=====================

Makes nested JS objects easier to reason with. An experiment in using ES6 proxies (for fun and profit).

## Install
`yarn install proxy-object-defaults`

## Example
```javascript
import proxyDefaults from 'proxy-object-defaults';

const DEFAULT = {
    filter: {
        showTimes: false,
        maxItems: 10
    }
}

let userSettings = {
    filter: {
        maxItems: 20
    }
}

let settings = proxyDefaults(userSettings, DEFAULT);
console.log(settings.filter);
// filter: {
//     showTimes: false,
//     maxItems: 20
// }

console.log(settings)
// filter: {
//    maxItems: 20
// }

delete settings.filter;
console.log(settings)
// {}
```

## Usage
`proxyDefaults(obj, defaults, deepClone=true)`