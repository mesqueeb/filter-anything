import filter from '../dist/index.cjs'
import pathsAreEqual from './helpers/pathsAreEqual.cjs'
import test from 'ava'

test('check fillables FLAT', t => {
  let res, doc, fillables, guard
  doc = {name: 'n1', id: '1', filled: true, notfilled: false}
  fillables = ['name', 'filled', 'id']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {name: 'n1', id: '1', filled: true})
})

test('check guard FLAT', t => {
  let res, doc, fillables, guard
  doc = {name: 'n1', id: '1', filled: true, guarded: true}
  fillables = []
  guard = ['guarded']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {name: 'n1', id: '1', filled: true})
})

test('check fillables NESTED - single fillable', t => {
  let res, doc, fillables, guard
  doc = {nested: {fillables: {yes: 0, no: 0}}, secondProp: true}
  fillables = ['nested.fillables.yes']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {fillables: {yes: 0}}})
  fillables = ['nested.fillables']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {fillables: {yes: 0, no: 0}}})
  fillables = ['nested']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {fillables: {yes: 0, no: 0}}})
})

test('check fillables NESTED - multiple fillable', t => {
  let res, doc, fillables, guard
  doc = {nested: {fillables: {yes: 0, no: 0}}, secondProp: {yes: true, no: false}}
  fillables = ['nested.fillables.yes', 'secondProp.yes']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {fillables: {yes: 0}}, secondProp: {yes: true}})
  fillables = ['nested.fillables', 'secondProp.yes']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {fillables: {yes: 0, no: 0}}, secondProp: {yes: true}})
  fillables = ['nested', 'secondProp.yes']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {fillables: {yes: 0, no: 0}}, secondProp: {yes: true}})
})

test('check guard NESTED', t => {
  let res, doc, fillables, guard
  doc = {nested: {guard: {yes: 0, no: 0}}, secondProp: true}
  guard = ['nested.guard.yes']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {guard: {no: 0}}, secondProp: true})
  guard = ['nested.guard']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {}, secondProp: true})
  guard = ['nested']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {secondProp: true})
})

test('check NESTED - multiple fillable & guard', t => {
  let res, doc, fillables, guard
  doc = {
    nested: {fillables: {yes: 0, no: 0}},
    secondProp: {yes: true, no: false},
    guardedTop: true,
    guardedDeep: {yes: true, no: true}
  }
  fillables = ['nested.fillables.yes', 'secondProp.yes', 'guardedTop', 'guardedDeep']
  guard = ['guardedTop', 'guardedDeep.yes']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {fillables: {yes: 0}}, secondProp: {yes: true}, guardedDeep: {no: true}})
  fillables = ['nested.fillables', 'secondProp.yes', 'guardedTop', 'guardedDeep']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {fillables: {yes: 0, no: 0}}, secondProp: {yes: true}, guardedDeep: {no: true}})
  fillables = ['nested', 'secondProp.yes', 'guardedTop', 'guardedDeep']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {nested: {fillables: {yes: 0, no: 0}}, secondProp: {yes: true}, guardedDeep: {no: true}})
})

test('check NESTED wildcards', t => {
  let res, doc, fillables, guard
  doc = {
    fillables: {
      '123': {yes: true, no: false},
      '456': {yes: true, no: false},
    },
    guarded: {
      '123': {yes: true, no: false},
      '456': {yes: true, no: false},
    }
  }
  fillables = ['fillables.*.yes', 'guarded']
  guard = ['guarded.*.yes']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {
    fillables: {
      '123': {yes: true},
      '456': {yes: true},
    },
    guarded: {
      '123': {no: false},
      '456': {no: false},
    }
  })
})

test('check custom class instances', t => {
  let res, doc, fillables, guard
  class A {
    constructor (payload) {
      this.isArrayHelper = true
      this.payload = payload
    }
  }
  let _1 = new A()
  let _2 = new A()
  t.is(_1 instanceof A, true)
  t.is(_2 instanceof A, true)
  doc = {
    fillables: {
      '123': {yes: _1, no: false},
      '456': {yes: true, no: false},
    },
    guarded: {
      '123': {yes: true, no: false},
      '456': {yes: true, no: _2},
    }
  }
  t.is(doc.fillables['123'].yes instanceof A, true)
  t.is(doc.guarded['456'].no instanceof A, true)
  fillables = ['fillables.*.yes', 'guarded']
  guard = ['guarded.*.yes']
  res = filter(doc, fillables, guard)
  t.deepEqual(res, {
    fillables: {
      '123': {yes: _1},
      '456': {yes: true},
    },
    guarded: {
      '123': {no: false},
      '456': {no: _2},
    }
  })
  t.is(_1 instanceof A, true)
  t.is(_2 instanceof A, true)
  t.is(res.fillables['123'].yes instanceof A, true)
  t.is(res.guarded['456'].no instanceof A, true)
})

test('pathsAreEqual', t => {
  t.is(pathsAreEqual('bob', '*'), true)
  t.is(pathsAreEqual('bob.and.alice', 'bob.*.alice'), true)
})
