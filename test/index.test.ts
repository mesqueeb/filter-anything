import { pick, omit } from '../src/index'
import pathsAreEqual from '../src/pathsAreEqual'
import { test, expect } from 'vitest'

test('check pick FLAT', () => {
  const doc = { name: 'n1', id: '1', filled: true, notfilled: false }
  const res = pick(doc, ['name', 'filled', 'id'])
  expect(res).toEqual({ name: 'n1', id: '1', filled: true })
})

test('check pick 0 props', () => {
  const doc = { name: 'n1', id: '1', filled: true, notfilled: false }
  const res = pick(doc, [] as any)
  expect(res).toEqual({} as any)
})

test('check omit FLAT', () => {
  const doc = { name: 'n1', id: '1', filled: true, omited: true }
  const res = omit(doc, ['omited'])
  expect(res).toEqual({ name: 'n1', id: '1', filled: true })
})

test('check picks NESTED - single pick', () => {
  const doc = {
    nested: { picks: { yes: 0, no: 0 } },
    secondProp: true,
  }
  const res = pick(doc, ['nested.picks.yes'])
  expect(res).toEqual({ nested: { picks: { yes: 0 } } })
})

test('check picks NESTED - single pick 2', () => {
  const doc = {
    nested: { picks: { yes: 0, no: 0 } },
    secondProp: true,
  }
  const res = pick(doc, ['nested.picks.yes'])
  expect(res).toEqual({ nested: { picks: { yes: 0 } } })
})

test('check picks NESTED - single pick 3', () => {
  const doc = {
    nested: { picks: { yes: 0, no: 0 } },
    secondProp: true,
  }
  const res = pick(doc, ['nested'])
  expect(res).toEqual({ nested: { picks: { yes: 0, no: 0 } } })
})

test('check picks NESTED - multiple pick', () => {
  const doc = {
    nested: { picks: { yes: 0, no: 0 } },
    secondProp: { yes: true, no: false },
  }

  const res1 = pick(doc, ['nested.picks.yes', 'secondProp.yes'])
  expect(res1).toEqual({ nested: { picks: { yes: 0 } }, secondProp: { yes: true } })

  const res2 = pick(doc, ['nested.picks', 'secondProp.yes'])
  expect(res2).toEqual({ nested: { picks: { yes: 0, no: 0 } }, secondProp: { yes: true } })

  const res3 = pick(doc, ['nested', 'secondProp.yes'])
  expect(res3).toEqual({ nested: { picks: { yes: 0, no: 0 } }, secondProp: { yes: true } })
})

test('check omit NESTED', () => {
  const doc = {
    nested: { omit: { yes: 0, no: 0 } },
    secondProp: true,
  }

  const res1 = omit(doc, ['nested.omit.yes'])
  expect(res1).toEqual({ nested: { omit: { no: 0 } }, secondProp: true })

  const res2 = omit(doc, ['nested.omit'])
  expect(res2).toEqual({ nested: {}, secondProp: true })

  const res3 = omit(doc, ['nested'])
  expect(res3).toEqual({ secondProp: true })

  const res4 = omit(doc, ['nested.omit.yes', 'secondProp'])
  expect(res4).toEqual({ nested: { omit: { no: 0 } } } as any)
})

test('check NESTED wildcards - pick', () => {
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

  expect(res).toEqual({
    picks: {
      '123': { yes: true },
      '456': { yes: true },
    },
  })
})
test('check NESTED wildcards - omit', () => {
  const doc = {
    picks: { '456': { yes: true, no: false } },
    omited: { '123': { yes: true, no: false }, '456': { yes: true, no: false } },
  }
  const res = omit(doc, ['omited.*.yes'] as any)
  expect(res).toEqual({
    picks: { '456': { yes: true, no: false } },
    omited: { '123': { no: false }, '456': { no: false } },
  })
})

test('pathsAreEqual', () => {
  expect(pathsAreEqual('bob', '*')).toEqual(true)
  expect(pathsAreEqual('bob.and.alice', 'bob.*.alice')).toEqual(true)
})
