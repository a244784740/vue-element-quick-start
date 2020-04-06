<template>
    <el-dialog  :visible.sync="dialog.isShow" :before-close="dialog.close" :title="dialog.config.title" 
        :width="dialog.config.width" :fullscreen="dialog.config.fullscreen" :top="dialog.config.top" 
        :modal="dialog.config.modal" :modal-append-to-body="dialog.config['modal-append-to-body']"
        :append-to-body="dialog.config['append-to-body']" :lock-scroll="dialog.config['lock-scroll']"
        :custom-class="dialog.config['custom-class']" :close-on-click-modal="dialog.config['close-on-click-modal']"
        :close-on-press-escape="dialog.config['close-on-press-escape']" :show-close="dialog.config['show-close']"
        :center="dialog.config.center" :destroy-on-close="dialog.config['destroy-on-close']"
        >
        <div :style="baseDialogStyle">
            <slot></slot>
            <slot name="footer"></slot>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            baseDialogStyle: {
                'max-height': '',
                'overflow-y': 'auto'
            }
        };
    },
    methods: {
        initBaseDialogStyle() {
            this.baseDialogStyle['max-height'] = this.dialog.config['max-height'];
        }
    },
    mounted() {
        this.initBaseDialogStyle();
    }
}
</script>