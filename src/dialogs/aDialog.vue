<template>
    <baseDialog :dialog="dialog">
        <el-button @click="openDialog">打开二级</el-button>
        <div slot="footer">footer</div>
    </baseDialog>
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