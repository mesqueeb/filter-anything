import filter from '../dist/index.cjs'
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

test('check fillables NESTED - multiple fillable & guard', t => {
  let res, doc, fillables, guard
  doc = {nested: {fillables: {yes: 0, no: 0}}, secondProp: {yes: true, no: false}, guardedTop: true, guardedDeep: {yes: true, no: true}}
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
