import { pick, omit } from '../src/index'
import pathsAreEqual from '../src/pathsAreEqual'
import test from 'ava'

test('check pick FLAT', (t) => {
  const doc = { name: 'n1', id: '1', filled: true, notfilled: false }
  const res = pick(doc, ['name', 'filled', 'id'])
  t.deepEqual(res, { name: 'n1', id: '1', filled: true })
})

test('check pick 0 props', (t) => {
  const doc = { name: 'n1', id: '1', filled: true, notfilled: false }
  const res = pick(doc, [] as any)
  t.deepEqual(res, {} as any)
})

test('check omit FLAT', (t) => {
  const doc = { name: 'n1', id: '1', filled: true, omited: true }
  const res = omit(doc, ['omited'])
  t.deepEqual(res, { name: 'n1', id: '1', filled: true })
})

test('check picks NESTED - single pick', (t) => {
  const doc = {
    nested: { picks: { yes: 0, no: 0 } },
    secondProp: true,
  }
  const res = pick(doc, ['nested.picks.yes'])
  t.deepEqual(res, { nested: { picks: { yes: 0 } } })
})

test('check picks NESTED - single pick 2', (t) => {
  const doc = {
    nested: { picks: { yes: 0, no: 0 } },
    secondProp: true,
  }
  const res = pick(doc, ['nested.picks.yes'])
  t.deepEqual(res, { nested: { picks: { yes: 0 } } })
})

test('check picks NESTED - single pick 3', (t) => {
  const doc = {
    nested: { picks: { yes: 0, no: 0 } },
    secondProp: true,
  }
  const res = pick(doc, ['nested'])
  t.deepEqual(res, { nested: { picks: { yes: 0, no: 0 } } })
})

test('check picks NESTED - multiple pick', (t) => {
  const doc = {
    nested: { picks: { yes: 0, no: 0 } },
    secondProp: { yes: true, no: false },
  }

  const res1 = pick(doc, ['nested.picks.yes', 'secondProp.yes'])
  t.deepEqual(res1, { nested: { picks: { yes: 0 } }, secondProp: { yes: true } })

  const res2 = pick(doc, ['nested.picks', 'secondProp.yes'])
  t.deepEqual(res2, { nested: { picks: { yes: 0, no: 0 } }, secondProp: { yes: true } })

  const res3 = pick(doc, ['nested', 'secondProp.yes'])
  t.deepEqual(res3, { nested: { picks: { yes: 0, no: 0 } }, secondProp: { yes: true } })
})

test('check omit NESTED', (t) => {
  const doc = {
    nested: { omit: { yes: 0, no: 0 } },
    secondProp: true,
  }

  const res1 = omit(doc, ['nested.omit.yes'])
  t.deepEqual(res1, { nested: { omit: { no: 0 } }, secondProp: true })

  const res2 = omit(doc, ['nested.omit'])
  t.deepEqual(res2, { nested: {}, secondProp: true })

  const res3 = omit(doc, ['nested'])
  t.deepEqual(res3, { secondProp: true })

  const res4 = omit(doc, ['nested.omit.yes', 'secondProp'])
  t.deepEqual(res4, { nested: { omit: { no: 0 } } } as any)
})

test('check NESTED wildcards - pick', (t) => {
  const doc = {
    picks: {
      '123': { yes: true, no: false },
      '456': { yes: true, no: false },
    },
    omited: {
      '123': { yes: true, no: false },
    },
  }

  type Res = { picks: { '123': { yes: boolean }; '456': { yes: boolean } } }

  const res: Res = pick(doc, ['picks.*.yes'] as any)

  t.deepEqual(res, {
    picks: {
      '123': { yes: true },
      '456': { yes: true },
    },
  })
})
test('check NESTED wildcards - omit', (t) => {
  const doc = {
    picks: { '456': { yes: true, no: false } },
    omited: { '123': { yes: true, no: false }, '456': { yes: true, no: false } },
  }
  const res = omit(doc, ['omited.*.yes'] as any)
  t.deepEqual(res, {
    picks: { '456': { yes: true, no: false } },
    omited: { '123': { no: false }, '456': { no: false } },
  } as any)
})

test('pathsAreEqual', (t) => {
  t.is(pathsAreEqual('bob', '*'), true)
  t.is(pathsAreEqual('bob.and.alice', 'bob.*.alice'), true)
})
