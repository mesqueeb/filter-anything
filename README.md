# Filter anything ⚔️

```
npm i filter-anything
```

Filter objects on "fillables" and "guard". A simple & small integration.

## Motivation

I created this package because I needed to filter on fillables or guard and **have support for sub-properties**.

## Usage

You can filter out any prop on an object based on fillables or guard.

- Fillables: Array of keys - the props which may stay
  - 0 fillables = all props stay
  - 1 or more fillables = only those props stay (any prop not in fillables is removed)
- Guard: Array of keys - the props which should be removed
  - adding any prop here will make sure it's removed

In the example below we want to get rid of the nested property called "discard".

```js
import filter from 'filter-anything'

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
