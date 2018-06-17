import _ from 'lodash';

const isObject = obj => (obj !== null && typeof obj === 'object');
const hasKey = (obj, key) => key in obj;

function handler(defaults) { 
    return {
        get(target, key) {
            if(hasKey(target, key)) {
                let prop = target[key];
                if(isObject(prop)) {
                    let nestedDefault = defaults[key];
                    return _proxyDefaults(prop, nestedDefault);
                } else {
                    return prop;
                }
            } else if(hasKey(defaults, key)) {
                let prop = defaults[key];
                if(isObject(prop)) {
                    return _proxyDefaults({}, prop);
                } else {
                    return prop;
                }
            }
        }
    };
};

export default function proxyDefaults(obj, defaults, deepClone=true) {
    if(deepClone) return _proxyDefaults(_.cloneDeep(obj), defaults);
    else return _proxyDefaults(obj, defaults);
}

function _proxyDefaults(obj, defaults) {
    return new Proxy(obj, handler(defaults));
}