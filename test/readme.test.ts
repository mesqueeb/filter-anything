import { expect, test } from 'vitest'
import { omit, pick } from '../src/index.js'

test('1', () => {
  const squirtle = { id: '007', name: 'Squirtle', type: 'water' }

  const withoutId = pick(squirtle, ['name', 'type'])

  expect(withoutId).toEqual({ name: 'Squirtle', type: 'water' })
})

test('2', () => {
  const squirtle = { id: '007', name: 'Squirtle', type: 'water' }

  const withoutId = omit(squirtle, ['id'])

  expect(withoutId).toEqual({ name: 'Squirtle', type: 'water' })
})
