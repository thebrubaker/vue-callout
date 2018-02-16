# Callout

## Overview

Callouts enable easy, dismissable notifications for your Vue + Vuex application. The API is dead simple for pushing callouts from any component:

``` js
// execute from any Vue component once installed
this.$callout('This is a callout.')
this.$callout({
  text: 'A callout can have an icon.',
  icon: 'cloud_queue'
})
this.$callout({
  text: 'A callout will be dismissed automatically after a timeout.',
  timeout: 2000
})
```

![Example Callouts](./docs/example-1.png?raw=true "Example Callouts")

## Quickstart

The Callout component maintains it's state as a Vuex module, so both Vue and Vuex are required. The first step is to connect the CalloutManager with Vue and your Vuex store.

``` js
// main.js
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Callout from '../index'

Vue.use(Vuex)

const store = new Vuex.Store()

// this will install a module in the Vuex store under `callout`
const callout = new Callout(store)

// this will provide access to callout on all Vue components as `this.$callout`
Vue.use(callout, '$callout')

const vm = new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
```

Next you will want to create a mounting point for your callouts. The best place for this is at the root component for your application. Here we use a render function, but you can just as easily define this in a template as `<component :is="Callout" />` and a computed property `Callout() { return this.$callout.Component }`.

``` js
// App.js
export default {
  render(createElement) {
    return createElement('div', { attrs: { id: 'app' } }, [
      createElement(this.$callout.Component),
    ]);
  }
}
```

## Config

The CalloutManager takes a second `options` argument to define a custom Vuex namespace.

``` js
const callout = new Callout(store, {
  namespace: 'callout' // default namespace
})
```
