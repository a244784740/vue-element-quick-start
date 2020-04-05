<template>
    <el-dialog title="提示" width="30%" :visible.sync="dialog.isShow" :before-close="dialog.close">
        二级
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
    }
}
</script>

<style>

</style>