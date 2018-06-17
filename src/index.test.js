import proxyDefaults from '.';

const DEFAULT_FILTER = {
    shown: true,
    ins: {
        shown: true,
    },
    outs: {
        shown: true
    }
}

let userFilter = {
    ins: {
        shown: false
    }
};

test('clones the object', () => {
    let filter1 = proxyDefaults(userFilter, DEFAULT_FILTER);
    let filter2 = proxyDefaults(userFilter, DEFAULT_FILTER);

    filter1.shown = false;
    expect(filter1.shown).toBe(false);
    expect(filter2.shown).toBe(true);
})

test('deep clones the object', () => {
    let filter1 = proxyDefaults(userFilter, DEFAULT_FILTER);
    let filter2 = proxyDefaults(userFilter, DEFAULT_FILTER);

    filter1.ins.shown = true;
    expect(filter1.ins.shown).toBe(true);
    expect(filter2.ins.shown).toBe(false);
})

test('looks up deep values', () => {
    let filter = proxyDefaults(userFilter, DEFAULT_FILTER);
    expect(filter.ins.shown).toBe(false);
    expect(filter.outs.shown).toBe(true);
})

test('can modify deep values', () => {
    let filter = proxyDefaults(userFilter, DEFAULT_FILTER);
    expect(filter.ins.shown).toBe(false);

    filter.ins.shown = true;
    expect(filter.ins.shown).toBe(true);
})

test('handles deleted keys', () => {
    let filter = proxyDefaults(userFilter, DEFAULT_FILTER);

    expect(filter.ins.shown).toBe(false);

    delete filter.ins;
    expect(filter.ins.shown).toBe(true);
})

test('returns null values set by the user', () => {
    let filter = proxyDefaults(userFilter, DEFAULT_FILTER);
    expect(filter.ins).toBeDefined();

    filter.ins.shown = null;
    expect(filter.ins.shown).toBe(null);
});

test('returns base user object on get', () => {
    let filter = proxyDefaults(userFilter, DEFAULT_FILTER);
    console.log(filter)

    delete filter.ins;
    console.log(filter)
})