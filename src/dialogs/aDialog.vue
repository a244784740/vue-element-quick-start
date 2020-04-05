<template>
    <el-dialog title="提示" width="30%" :visible.sync="dialog.isShow" :before-close="dialog.close">
        <el-button @click="openDialog">打开二级</el-button>
    </el-dialog>
</template>

<script>
export default {
    name: 'a-dialog',
    props: {
        dialog: {
            type: Object
        }
    },
    methods: {
        openDialog() {
            let dialogConfig = {
                dialogType: 'bDialog',
                item: '123'
            }
            this.veqs._addDialogFunc(dialogConfig);
        }
    }
}
</script>

<style>

</style>