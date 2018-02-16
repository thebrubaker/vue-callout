import Item from './components/item';
import Container from './components/container';
import module from './store/module';

/**
 * Manages callout components, registering the vuex store, and triggering
 * actions.
 */
export default class Callout {
  /**
   * The constructor for managing callouts.
   * @param {Store} store The Vuex store.
   * @param {Object} options The options for callouts.
   */
  constructor(store, options = {}) {
    this.store = store;
    this.namespace = options.namespace || 'callout';
    this.components = this.namespaceComponents(this.namespace, {
      Item,
      Container,
    });
    store.registerModule(this.namespace, module);
    return new Proxy(() => {}, this);
  }

  /**
   * A trap for function calls on the class.
   * @param  {Object} target  The target object.
   * @param  {Object} context  The `this` argument for the call.
   * @param  {Array} argList  The list of arguments.
   * @return {any}
   */
  apply(target, context, argList) {
    return this.push(...argList);
  }

  /**
   * A trap for getting a property values.
   * @param  {Object} target  The target object
   * @param  {string} property  The name of the property.
   * @return {mixed}
   */
  get(target, property, receiver) {
    if (property === 'get') {
      return undefined;
    }

    if (property === 'apply') {
      return undefined;
    }

    return this[property];
  }

  /**
   * Apply the namespace option to the provided components.
   * @param {String} namespace The namespace.
   * @param {Object} components The components to namespace.
   */
  namespaceComponents(namespace, components = {}) {
    return Object.keys(components).reduce((carry, key) => {
      return {
        ...carry,
        [key]: {
          ...components[key],
          namespace,
        },
      };
    }, {});
  }

  /**
   * Push a callout onto the list of callouts.
   * @param {Object|String} callout The callout to push.
   */
  push(callout) {
    this.store.commit(`${this.namespace}/push`, callout);
  }

  /**
   * Clear all callouts.
   */
  clear() {
    this.store.commit(`${this.namespace}/clear`);
  }

  /**
   * Return the Container component.
   */
  get Component() {
    return this.components.Container;
  }

  /**
   * Install the callout on all Vue instances.
   * @param {Vue} Vue The Vue library.
   * @param {String} propName The name to alias on all vue instances.
   */
  install(Vue, propName = '$callout') {
    Object.defineProperties(Vue.prototype, {
      [propName]: {
        get: () => this,
      },
    });
  }
}
