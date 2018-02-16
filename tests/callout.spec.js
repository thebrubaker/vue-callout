import Vue from 'vue';
import Vuex from 'vuex';
import CalloutManager from '../index';

Vue.use(Vuex);

const store = new Vuex.Store();
const callout = new CalloutManager(store);

Vue.use(callout, '$callout');

const vm = new Vue({
  store,
  render: h => h(callout.Component, { ref: 'callout' }),
});

vm.$mount();

describe('Vue', () => {
  it('should install CalloutManager', () => {
    expect(vm.$callout).to.equal(callout);
  });
});

describe('Vuex', () => {
  it('should have callout mutations', () => {
    expect(store['_mutations']['callout/push']).to.exist;
    expect(store['_mutations']['callout/clear']).to.exist;
    expect(store['_mutations']['callout/dismiss']).to.exist;
  });
  it('should have callout getters', () => {
    expect(store.getters['callout/list']).to.exist;
  });
  it('should increment when a callout is pushed to the list', () => {
    store.commit('callout/push', 'foo');
    expect(store.getters['callout/list'][0]).to.exist;
    expect(store.getters['callout/list'][1]).to.not.exist;
    store.commit('callout/push', 'foo');
    expect(store.getters['callout/list'][1]).to.exist;
    store.commit('callout/clear');
    expect(store.getters['callout/list'][0]).to.not.exist;
    expect(store.getters['callout/list'][1]).to.not.exist;
    expect(store.getters['callout/list'][2]).to.not.exist;
    store.commit('callout/push', 'foo');
    expect(store.getters['callout/list'][2]).to.exist;
  });
});

describe('CalloutManager', () => {
  it('should push a callout', () => {
    const spy = sinon.spy(store, 'commit');
    callout.push('foo');
    expect(spy).to.have.been.calledWith('callout/push', 'foo');
    store.commit.restore();
  });
  it('should be callable', () => {
    const spy = sinon.spy(store, 'commit');
    callout('foo');
    expect(spy).to.have.been.calledWith('callout/push', 'foo');
    store.commit.restore();
  });
  it('should clear all callouts', () => {
    const spy = sinon.spy(store, 'commit');
    callout.clear();
    expect(spy).to.have.been.calledWith('callout/clear');
    store.commit.restore();
  });
  it('should have access to the Container component', () => {
    expect(callout.Component).to.equal(callout.components.Container);
  });
  it('should namespace components', () => {
    expect(callout.components.Container.namespace).to.equal('callout');
    expect(callout.components.Item.namespace).to.equal('callout');
  });
});

describe('Container', () => {
  it('should compute the list of callouts', () => {
    expect(vm.$refs.callout.list).to.equal(store.getters['callout/list']);
  });
  it('should have a dismiss method', () => {
    const spy = sinon.spy(store, 'commit');
    vm.$refs.callout.dismiss(1);
    expect(spy).to.have.been.calledWith('callout/dismiss', 1);
    store.commit.restore();
  });
});

describe('Item', () => {
  const Item = Vue.extend(callout.components.Item);
  it('should close after a timeout', done => {
    const vm = new Item({
      propsData: {
        id: 1,
        text: 'Testing',
        timeout: 100,
      },
    });
    const spy = sinon.spy(vm, 'close');
    vm.$mount();
    setTimeout(() => {
      expect(spy).to.have.been.called;
      done();
    }, 100);
  });
  it('should emit close when dismiss is clicked', () => {
    const vm = new Item({
      propsData: {
        id: 2,
        text: 'Testing',
        timeout: false,
      },
    });
    vm.$mount();
    const spy = sinon.spy(vm, '$emit');
    vm.$el.querySelector('.callout__dismiss').click();
    expect(spy).to.have.been.calledWith('close', 2);
  });
});
