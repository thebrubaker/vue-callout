<template>
  <div class="callout-container">
    <transition-group name="slide-left">
      <Item v-for="(callout, id) in list"
        :key="id"
        :id="id"
        v-bind="callout"
        @close="dismiss" />
    </transition-group>
  </div>
</template>

<script>
import Item from './item';

export default {
  name: 'CalloutContainer',
  components: {
    Item,
  },
  computed: {
    list() {
      return this.$store.getters[`${this.$options.namespace}/list`];
    },
  },
  methods: {
    dismiss(id) {
      this.$store.commit(`${this.$options.namespace}/dismiss`, id);
    },
  },
};
</script>

<style lang="scss" scoped>
.callout-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 20px;
  z-index: 4;
}
.slide-left-enter-active {
  transition: all 0.3s ease;
}
.slide-left-leave-active {
  transition: all 0.3s ease;
}
.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(50%);
  opacity: 0;
}
</style>
