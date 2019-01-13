# Filter anything ⚔️

```
npm i filter-anything
```

Filter out objects based on "fillables" and "guard". A simple & small integration.

## Motivation

I created this package because I needed to filter on fillables or guard and **have support for sub-properties**.

## Meet the family

- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [find-and-replace-anything 🎣](https://github.com/mesqueeb/find-and-replace-anything)
- [compare-anything 🛰](https://github.com/mesqueeb/compare-anything)
- [copy-anything 🎭](https://github.com/mesqueeb/copy-anything)
- [is-what 🙉](https://github.com/mesqueeb/is-what)

## Usage

You can filter out any prop in an object based on fillables or guard.

- Fillables: Array of keys - the props which may stay
  - 0 fillables = all props stay
  - 1 or more fillables = only those props stay (any prop not in fillables is removed)
- Guard: Array of keys - the props which should be removed
  - adding any prop here will make sure it's removed

You can use it by doing `filter(object, fillables, guard)` and it will return the `object` with just the props as per the fillables and/or guard!

### Simple example

In the example below we want to get rid of the properties called "discard1" and "discard2".

```js
import filter from 'filter-anything'

const doc = {keep1: '📌', keep2: '🧷', keep3: '📎', discard1: '✂️', discard2: '🖍'}

// via fillables
const fillables = ['keep1', 'keep2', 'keep3']
filter(doc, fillables)
// returns {keep1: 1, keep2: 1, keep3: 1}

// OR via guard
const guard = ['discard1', 'discard2']
filter(doc, [], guard)
// returns {keep1: 1, keep2: 1, keep3: 1}
```

### Nested example

In the example below we want to get rid of the **nested property** called "discard".

```js
const doc = {items: {keep: '📌', discard: '✂️'}}

// via fillables:
const fillables = ['items.keep']
filter(doc, fillables)
// returns {items: {keep: '📌'}}

// OR via guard:
const guard = ['items.discard']
filter(doc, [], guard)
// returns {items: {keep: '📌'}}
```

## Wildcards

Yes! You can also work with wildcards by using `*` in the path.

```js
const doc = {
  '123': {keep: '📌', discard: '✂️'},
  '456': {keep: '📌', discard: '✂️'}
}
// use wildcard *
const guard = ['*.discard']
filter(doc, [], guard)
// returns {
//   '123': {keep: '📌'},
//   '456': {keep: '📌'}
// }
```

Feel free to open issues for any requests, questions or bugs!
