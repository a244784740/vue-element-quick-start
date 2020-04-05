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
      let dialogConfig = {
        dialogType: 'aDialog',
        item: {}
      }
      this.veqs._addDialogFunc(dialogConfig);
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
