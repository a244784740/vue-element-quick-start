<template>
  <div id="app">
      <el-button @click="addDialog">激活弹窗</el-button>
  </div>
</template>

<script>
import aDialog from '@/dialogs/aDialog';
export default {
  name: 'App',
  components: {
    'a-dialog': aDialog
  },
  methods: {
    addDialog() {
      let dialog = {
        dialogType: 'aDialog',
        config: {
            title: '弹窗A',
            'max-height': '400px'
        },
        item: {}
      }
      this.veqs._addDialogFunc(dialog);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
