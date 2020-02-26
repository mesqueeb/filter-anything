# Filter anything ⚔️

```
npm i filter-anything
```

An implementation that filters out object props like the TypeScript "pick" and "omit".
In the Laravel world, this is also called "fillables" and "guard".

## Motivation

I created this package because I needed:

- be able to filter out object props based on just what we need - aka "pick" props
- be able to filter out object props based on what we don't need - aka "omit" props
- **supports for nested properties**
- supports wildcards `*` for nested properties
- the return type must be TypeScript supported! (see screenshots below)

## Meet the family

- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [find-and-replace-anything 🎣](https://github.com/mesqueeb/find-and-replace-anything)
- [compare-anything 🛰](https://github.com/mesqueeb/compare-anything)
- [copy-anything 🎭](https://github.com/mesqueeb/copy-anything)
- [flatten-anything 🏏](https://github.com/mesqueeb/flatten-anything)
- [is-what 🙉](https://github.com/mesqueeb/is-what)

## Usage

### Pick

With `pick` you pass an object and an array of keys of an object - **the props which may stay**.

```js
import { fillable } from 'filter-anything'

const squirtle = { id: '007', name: 'Squirtle', type: 'water' }

const withoutId = fillable(squirtle, ['name', 'type'])
// returns { name: 'Squirtle', type: 'water' }
```

### Guard

With `guard` you pass an object and an array of keys of an object - the props which should be removed.

```js
import { guard } from 'filter-anything'

const squirtle = { id: '007', name: 'Squirtle', type: 'water' }

const withoutId = guard(squirtle, ['name', 'type'])
// returns { name: 'Squirtle', type: 'water' }
```

### Aliases

`pick()` and `omit()` can also be imported with the names `fillable()` and `guard()`. This pays homage to my history with Laravel. 😉

### TypeScript

TypeScript users will love this, because, as you can see, the result has the correct type automatically!

![typescript example pick](https://raw.githubusercontent.com/mesqueeb/filter-anything/master/.github/typescript-pick.png)
![typescript example omit](https://raw.githubusercontent.com/mesqueeb/filter-anything/master/.github/typescript-omit.png)

### Nested props

In the example below we want to get rid of the **nested property** called "discard".

```js
const doc = { items: { keep: '📌', discard: '✂️' } }

pick(doc, ['items.keep'])
// returns {items: {keep: '📌'}}

omit(doc, ['items.discard'])
// returns {items: {keep: '📌'}}
```

> Please note that TypeScript users will need to cast the result when using nested props.

## Wildcards

Yes! You can also work with wildcards by using `*` in the path.

```js
const doc = {
  '123': { keep: '📌', discard: '✂️' },
  '456': { keep: '📌', discard: '✂️' },
}
// use wildcard *
omit(doc, ['*.discard'])
// returns {
//   '123': {keep: '📌'},
//   '456': {keep: '📌'}
// }
```

> Please note that TypeScript users will need to cast the result when using wildcards props.

Feel free to open issues for any requests, questions or bugs!
