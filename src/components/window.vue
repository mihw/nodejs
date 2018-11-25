<template>

    <transition v-on:enter="enter" >

        <div class="wnd_outer"
             v-show="_visible"
             v-bind:style="windowStyle"
             
>

            <div class="bg_screen" v-if="dialogMode"></div>

            <div class="caption" @mousedown.prevent="mousedown">

                {{ caption }}

                <input class="close" type="button" @click="closeButtonClicked" value="x">

            </div>

            <div class="wnd_inner" ref="wndInner" v-bind:class="{wnd_inner_withbtn: selectButtons.length > 0 }" ></div>

            <div class="wnd_button_outer" ref="buttonOuter" v-if="selectButtons.length">

                <button  class="button_item" @click="buttonClicked(item)"   v-for="(item,index) in selectButtons" :key="index">
                    {{ item.caption }}
                </button>

            </div>

            <div class="mod_size" v-if="sizeChangeEnable" @mousedown="startSizeChange"></div>

        </div>
    </transition>

</template>



<script>
import position from "../logic/position.js";
import store from "../logic/store.js";

export default {
  mixins: [position],
  store,
  props: {
    visible: {
      type: Boolean,

      default: true
    },

    caption: {
      type: String,

      default: ""
    },
    selectButtons: {
      type: Array,

      default: () => []
    },

    dialogMode: {
      type: Boolean,

      default: false
    }
  },
  mounted: function() {
    this.$emit("require-inner-item", el => {
      this.$refs.wndInner.appendChild(el);

      // �ｿｽiv-show=false�ｿｽﾌ趣ｿｽ�ｿｽﾍ要�ｿｽf�ｿｽﾌ搾ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽﾈゑｿｽ�ｿｽﾌで擾ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽﾈゑｿｽ�ｿｽj

      if (this.visible && this.$el) {
        this.setInitialState();
      }
    });
  },

  computed: {
    _visible: function() {
      if (this.visible) {
        this.$emit("opened");
      } else {
        this.$emit("closed");
      }

      return this.visible;
    }
  },
  methods: {
    //

    //  Buttons

    //

    buttonClicked: function(item) {
      this.$emit("button-clicked", item);
    },

    closeButtonClicked: function() {
      this.$emit("closed");

      this.$emit("update:visible", false);
    }
  }
};
</script>



<style scoped>
.wnd_outer {
  position: fixed;

  background-color: white;

  width: 100%;

  height: 100%;

  border-radius: 3px;

  border: solid 1px black;

  border-radius: 5px 5px 0 0;

  background-color: #555;

  z-index: 1000;
}

.caption {
  width: 100%;

  height: 22px;

  background-color: #333;

  padding: 0;

  box-sizing: border-box;

  color: white;

  font-size: 9pt;

  padding: 4px 0 4px 10px;

  position: relative;
}

.close {
  background-color: transparent;

  color: white;

  border-style: solid;

  border-color: white;

  border-width: 0 0 0 1px;

  cursor: pointer;

  position: absolute;

  bottom: 3px;

  right: 0px;
}

.mod_size {
  position: absolute;

  bottom: 0px;

  right: 0px;

  width: 10px;

  height: 10px;

  background-color: red;
}

.wnd_inner {
  width: 100%;

  height: calc(100% - 22px);

  position: relative;
}

.wnd_inner_withbtn {
  height: calc(100% - 67px);
}

.wnd_button_outer {
  position: absolute;

  width: 100%;

  height: 45px;

  text-align: center;
}

.button_item {
  height: 30px;

  min-width: 90px;

  padding: 5px 15px;

  margin-top: 9px;

  margin-left: 5px;

  border-style: solid;

  border-color: black;

  border-width: 1px 3px 3px 1px;

  border-radius: 3px;

  background-color: #333;

  color: white;

  cursor: pointer;

  position: relative;

  box-sizing: border-box;

  display: inline-block;

  vertical-align: top;
}

.button_item:active {
  border-width: 1px;

  top: 2px;

  left: 2px;
}

.bg_screen {
  background-color: rgba(0, 0, 0, 0.5);

  width: 100%;

  height: 100%;

  position: fixed;

  top: 0;

  left: 0;
}
</style>