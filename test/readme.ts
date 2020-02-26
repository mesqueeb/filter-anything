import { pick, omit } from '../src/index'
import test from 'ava'

test('1', t => {
  const squirtle = { id: '007', name: 'Squirtle', type: 'water' }

  const withoutId = pick(squirtle, ['name', 'type'])

  t.deepEqual(withoutId, { name: 'Squirtle', type: 'water' })
})

test('2', t => {
  const squirtle = { id: '007', name: 'Squirtle', type: 'water' }

  const withoutId = omit(squirtle, ['id'])

  t.deepEqual(withoutId, { name: 'Squirtle', type: 'water' })
})
