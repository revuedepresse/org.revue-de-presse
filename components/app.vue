<template>
  <div class='app'>
    <router-view />
    <modal-window />
  </div>
</template>

<script>
import ModalWindow from './modal-window/modal-window.vue';

export default {
  name: 'app',
  components: {
    ModalWindow
  }
};
</script>
