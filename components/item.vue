<template>
  <div class="callout">
    <div class="callout__text">
      <i class="callout__icon" v-if="icon">{{ icon }}</i>
      {{ text }}
    </div>
    <div class="callout__dismiss" v-if="dismiss" @click="close">
      Dismiss
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      default: '',
    },
    text: {
      required: true,
      default: '',
    },
    icon: {
      required: false,
      default: '',
    },
    dismiss: {
      required: false,
      default: true,
    },
    timeout: {
      type: [Boolean, Number],
      required: false,
      default: 5000,
    },
  },
  computed: {},
  methods: {
    close() {
      this.$emit('close', this.id);
    },
  },
  mounted() {
    if (this.timeout) {
      setTimeout(() => {
        this.close();
      }, this.timeout);
    }
  },
};
</script>

<style lang="scss" scoped>
.callout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 16px;
  min-width: 300px;
  border-radius: 2px;
  padding: 14px 24px;
  margin-top: 20px;
  z-index: 1;

  @media (max-width: 600px) {
    min-width: 100%;
  }

  &__text {
    display: flex;
    align-items: center;
    width: 100%;
  }
  &__icon {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    padding-right: 14px;
  }
  &__dismiss {
    cursor: pointer;
    user-select: none;
    color: #555;
    font-weight: 600;
    text-transform: uppercase;
    padding-left: 24px;
  }
}
</style>
