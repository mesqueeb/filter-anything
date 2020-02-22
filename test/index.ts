import { fillable, guard } from '../src/index'
import pathsAreEqual from '../src/pathsAreEqual'
import test from 'ava'

test('check fillable FLAT', t => {
  const doc = { name: 'n1', id: '1', filled: true, notfilled: false }
  const res = fillable(doc, ['name', 'filled', 'id'])
  t.deepEqual(res, { name: 'n1', id: '1', filled: true })
})

test('check fillable 0 props', t => {
  const doc = { name: 'n1', id: '1', filled: true, notfilled: false }
  const res = fillable(doc, [])
  t.deepEqual(res, {})
})

test('check guard FLAT', t => {
  const doc = { name: 'n1', id: '1', filled: true, guarded: true }
  const res = guard(doc, ['guarded'])
  t.deepEqual(res, { name: 'n1', id: '1', filled: true })
})

// test('check filter FLAT', t => {
//   const doc = { nested: { fillables: { yes: 0, no: 0 } }, guarded: true }
//   const res = filter(doc, ['nested', 'guarded'])
//   t.deepEqual(res, { nested: { fillables: { yes: 0, no: 0 } } })
// })

test('check fillables NESTED - single fillable', t => {
  const doc = { nested: { fillables: { yes: 0, no: 0 } }, secondProp: true }
  const res = fillable(doc, ['nested.fillables.yes'])
  t.deepEqual(res, { nested: { fillables: { yes: 0 } } })
})

test('check fillables NESTED - single fillable 2', t => {
  const doc = { nested: { fillables: { yes: 0, no: 0 } }, secondProp: true }
  const res = fillable(doc, ['nested.fillables'])
  t.deepEqual(res, { nested: { fillables: { yes: 0, no: 0 } } })
})

test('check fillables NESTED - single fillable 3', t => {
  const doc = { nested: { fillables: { yes: 0, no: 0 } }, secondProp: true }
  const res = fillable(doc, ['nested'])
  t.deepEqual(res, { nested: { fillables: { yes: 0, no: 0 } } })
})

test('check fillables NESTED - multiple fillable', t => {
  const doc = {
    nested: { fillables: { yes: 0, no: 0 } },
    secondProp: { yes: true, no: false },
  }
  const res1 = fillable(doc, ['nested.fillables.yes', 'secondProp.yes'])
  t.deepEqual(res1, {
    nested: { fillables: { yes: 0 } },
    secondProp: { yes: true },
  })
  const res2 = fillable(doc, ['nested.fillables', 'secondProp.yes'])
  t.deepEqual(res2, {
    nested: { fillables: { yes: 0, no: 0 } },
    secondProp: { yes: true },
  })
  const res3 = fillable(doc, ['nested', 'secondProp.yes'])
  t.deepEqual(res3, {
    nested: { fillables: { yes: 0, no: 0 } },
    // @ts-ignore
    secondProp: { yes: true },
  })
})

test('check guard NESTED', t => {
  const doc = { nested: { guard: { yes: 0, no: 0 } }, secondProp: true }
  const res1 = guard(doc, ['nested.guard.yes'])
  // @ts-ignore
  t.deepEqual(res1, { nested: { guard: { no: 0 } }, secondProp: true })
  const res2 = guard(doc, ['nested.guard'])
  // @ts-ignore
  t.deepEqual(res2, { nested: {}, secondProp: true })
  const res3 = guard(doc, ['nested'])
  t.deepEqual(res3, { secondProp: true })
})

// test('check NESTED - multiple fillable & guard', t => {
//   const doc = {
//     nested: { fillables: { yes: 0, no: 0 } },
//     secondProp: { yes: true, no: false },
//     guardedTop: true,
//     guardedDeep: { yes: true, no: true },
//   }
//   const res = filter(doc, ['nested.fillables.yes', 'secondProp.yes', 'guardedTop', 'guardedDeep'], ['guardedTop', 'guardedDeep.yes'])
//   t.deepEqual(res, {
//     nested: { fillables: { yes: 0 } },
//     secondProp: { yes: true },
//     guardedDeep: { no: true },
//   })
// })
// test('check NESTED - multiple fillable & guard 2', t => {
//   const doc = {
//     nested: { fillables: { yes: 0, no: 0 } },
//     secondProp: { yes: true, no: false },
//     guardedTop: true,
//     guardedDeep: { yes: true, no: true },
//   }
//   const res = filter(doc, ['nested.fillables', 'secondProp.yes', 'guardedTop', 'guardedDeep'], ['guardedTop', 'guardedDeep.yes'])
//   t.deepEqual(res, {
//     nested: { fillables: { yes: 0, no: 0 } },
//     // @ts-ignore
//     secondProp: { yes: true },
//     // @ts-ignore
//     guardedDeep: { no: true },
//   })
// })
// test('check NESTED - multiple fillable & guard 3', t => {
//   const doc = {
//     nested: { fillables: { yes: 0, no: 0 } },
//     secondProp: { yes: true, no: false },
//     guardedTop: true,
//     guardedDeep: { yes: true, no: true },
//   }
//   const res = filter(doc, ['nested', 'secondProp.yes', 'guardedTop', 'guardedDeep'], ['guardedTop', 'guardedDeep.yes'])
//   t.deepEqual(res, {
//     nested: { fillables: { yes: 0, no: 0 } },
//     // @ts-ignore
//     secondProp: { yes: true },
//     // @ts-ignore
//     guardedDeep: { no: true },
//   })
// })

test('check NESTED wildcards - fillable', t => {
  const doc = {
    fillables: {
      '123': { yes: true, no: false },
      '456': { yes: true, no: false },
    },
    guarded: {
      '123': { yes: true, no: false },
    },
  }
  const res = fillable(doc, ['fillables.*.yes'])
  t.deepEqual(res, {
    fillables: {
      '123': { yes: true },
      '456': { yes: true },
    },
  })
})
test('check NESTED wildcards - guard', t => {
  const doc = {
    fillables: {
      '456': { yes: true, no: false },
    },
    guarded: {
      '123': { yes: true, no: false },
      '456': { yes: true, no: false },
    },
  }
  const res = guard(doc, ['guarded.*.yes'])
  t.deepEqual(res, {
    fillables: {
      '456': { yes: true, no: false },
    },
    guarded: {
      // @ts-ignore
      '123': { no: false },
      // @ts-ignore
      '456': { no: false },
    },
  })
})
// test('check NESTED wildcards - filter', t => {
//   let res: object, fillables: string[], guard: string[]
//   const doc = {
//     fillables: {
//       '123': { yes: true, no: false },
//       '456': { yes: true, no: false },
//     },
//     guarded: {
//       '123': { yes: true, no: false },
//       '456': { yes: true, no: false },
//     },
//   }
//   fillables = ['fillables.*.yes', 'guarded']
//   guard = ['guarded.*.yes']
//   res = filter(doc, fillables, guard)
//   t.deepEqual(res, {
//     fillables: {
//       '123': { yes: true },
//       '456': { yes: true },
//     },
//     guarded: {
//       '123': { no: false },
//       '456': { no: false },
//     },
//   })
// })

// test('check custom class instances', t => {
//   class A {
//     isArrayHelper: boolean
//     payload: any
//     constructor (payload?: any) {
//       this.isArrayHelper = true
//       this.payload = payload
//     }
//   }
//   let _1 = new A()
//   let _2 = new A()
//   t.is(_1 instanceof A, true)
//   t.is(_2 instanceof A, true)
//   const doc = {
//     fillables: {
//       '123': { yes: _1, no: false },
//       '456': { yes: true, no: false },
//     },
//     guarded: {
//       '123': { yes: true, no: false },
//       '456': { yes: true, no: _2 },
//     },
//   }
//   t.is(doc.fillables['123'].yes instanceof A, true)
//   t.is(doc.guarded['456'].no instanceof A, true)
//   const res = filter(doc, ['fillables.*.yes', 'guarded'], ['guarded.*.yes'])
//   t.deepEqual(res, {
//     fillables: {
//       '123': { yes: _1 },
//       '456': { yes: true },
//     },
//     guarded: {
//       '123': { no: false },
//       '456': { no: _2 },
//     },
//   })
//   t.is(_1 instanceof A, true)
//   t.is(_2 instanceof A, true)
//   // @ts-ignore
//   t.is(res.fillables['123'].yes instanceof A, true)
//   // @ts-ignore
//   t.is(res.guarded['456'].no instanceof A, true)
// })

test('pathsAreEqual', t => {
  t.is(pathsAreEqual('bob', '*'), true)
  t.is(pathsAreEqual('bob.and.alice', 'bob.*.alice'), true)
})
