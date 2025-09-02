<template>

    <div class="wnd-area">

        <!-- Window 1 -->

        <wnd-component caption="Window1"

                       :visible.sync="isVisibleWindow"

                       @require-inner-item="window1RequireInnerItem"

                       ></wnd-component>

        <div ref="window1Inner" class="window-first-inner">

            Hello world!!

        </div>



        <!-- Window 2 -->

        <wnd-component caption="Window2"

                       :visible.sync="isVisibleWindow2"

                       :initial-position="[160, 160]"

                       @require-inner-item="window2RequireInnerItem"

                       ></wnd-component>

        <div ref="window2Inner" class="window-second-inner">

            <img src="img/hakoneko.png" alt="neko">

        </div>



        <!-- Window 3 -->

        <wnd-component caption="Window3"

                       :visible.sync="isVisibleWindow3"

                       @require-inner-item="window3RequireInnerItem"

                       @button-clicked="buttonClicked"

                       :initial-position="[30, 30]"

                       :select-buttons="[{caption: '�͂�'}, {caption: '������'}]"

                       ></wnd-component>

        <div ref="window3Inner" class="window-third-inner">

            �i�͂��F�������{�^���̃e�X�g�ł��j����ł����ł����H

        </div>

    </div>

</template>



<script lang="ts">
import Vue from 'vue'
import store from "../logic/store"
import wndComponent from "./wnd.vue"

export default Vue.extend({

    components: {

        wndComponent

    },

    data() {

        return {

            isVisibleWindow: true,                              //Window1 visible

            isVisibleWindow2: true,                             //Window2 visible

            isVisibleWindow3: true,                             //Window3 visible

        }

    },

    store,

    methods: {

        window1RequireInnerItem(callback: (el: HTMLElement) => void) {

            //�E�C���h�E1�ɓ��ׂ��v�f��ݒ�

            callback(this.$refs.window1Inner as HTMLElement);

        },

        window2RequireInnerItem(callback: (el: HTMLElement) => void) {

            //�E�C���h�E2�ɓ��ׂ��v�f��ݒ�

            callback(this.$refs.window2Inner as HTMLElement);

        },

        window3RequireInnerItem(callback: (el: HTMLElement) => void) {

            //�E�C���h�E3�ɓ��ׂ��v�f��ݒ�

            callback(this.$refs.window3Inner as HTMLElement);

        },

        buttonClicked(item: { caption: string }) {

            //�����ꂽ�{�^����\������

            alert(`�����ꂽ�{�^���́u${item.caption}�v`);

        }

    },

})
</script>



<style scoped>

.wnd-area {

    width: 100%;

    height: 100%;

    position: absolute;

    user-select: none;

}

.window-first-inner {

    width: 200px;

    height: 100px;

    color: white;

}

.window-second-inner, .window-third-inner {

    color: white;

}

.window-second-inner img {

    display: block;

    width: 300px;

    height: 300px;

}

</style>