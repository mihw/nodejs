export default {
  data: function () {
    return {
      wndID: 0,

      x: null,

      y: null,

      cursorOffset: {
        x: 0,
        y: 0
      },

      cursorStartPos: null,

      stateAtSizeChangeStarted: {
        width: 0,
        height: 0,
        cursorX: 0,
        cursorY: 0
      },

      width: this.initialWidth,

      height: this.initialHeight

    }
  },
  props: {
    initialPosition: {
      type: Array,

      default: null
    },

    sizeChangeEnable: {
      type: Boolean,

      default: true
    },

    initialWidth: {
      type: Number,

      default: 0
    },

    initialHeight: {
      type: Number,

      default: 0
    }
  },

  computed: {

    _width: function () {
      return this.width ? `${this.width}px` : 'auto'
    },

    _height: function () {
      return this.height ? `${this.height}px` : 'auto'
    },

    _x: function () {
      return `${this.x}px`
    },

    _y: function () {
      return `${this.y}px`
    },

    zIndex: function () {
      return this.$store.state.wndStatuses[this.wndID].zIndex || 0
    },
    windowStyle: function () {
      return {
        width: this._width,

        height: this._height,

        left: this._x,

        top: this._y,

        zIndex: this.zIndex
      }
    }
  },

  created: function () {
    this.wndID = this.$store.state.wndCount

    this.$store.dispatch('setWndStatuses', {
      wndID: this.$store.state.wndCount
    })
  },

  methods: {
    //

    //  Initialize

    //

    enter: function () {
      this.setInitialState()
    },

    setInitialState: function () {
      // v-if�ｿｽﾈどで要�ｿｽf�ｿｽ�ｿｽ�ｿｽﾌゑｿｽ�ｿｽ�ｿｽ�ｿｽﾈゑｿｽ�ｿｽ鼾�ｿｽﾍ擾ｿｽ�ｿｽ�ｿｽ�ｿｽ�断

      if (!this.$el || !this.$refs.wndInner) return

      let buttonItemRect = null

      if (this.selectButtons.length) {
        buttonItemRect = this.$refs.buttonOuter.getBoundingClientRect()
      }

      let innerItemRect = this.$refs.wndInner.getBoundingClientRect()

      this.width = this.initialWidth || innerItemRect.width

      this.height =
        (this.initialHeight || innerItemRect.height) +
        22 +
        (this.selectButtons.length && buttonItemRect
          ? buttonItemRect.height
          : 0)

      // �ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽﾏゑｿｽﾅゑｿｽ�ｿｽ�ｿｽﾎ擾ｿｽ�ｿｽ�ｿｽ�ｿｽ�ｿｽI�ｿｽ�ｿｽ

      if (this.x !== null && this.y !== null) return

      if (this.initialPosition && this.initialPosition.length === 2) {
        this.x = this.initialPosition[0]

        this.y = this.initialPosition[1]
      } else {
        this.x = window.innerWidth / 2 - this.$el.clientWidth / 2

        this.y = window.innerHeight / 2 - this.$el.clientHeight / 2
      }
    },

    //

    //  Change position

    //

    mousedown: function (e) {
      this.cursorOffset.x = e.pageX

      this.cursorOffset.y = e.pageY

      this.cursorStartPos = {
        x: this.x,
        y: this.y
      }

      document.addEventListener('mousemove', this.mousemove)

      document.addEventListener('mouseup', this.mouseup)

      this.$store.dispatch('moveWndToTop', {
        wndID: this.wndID
      })
    },

    mousemove: function (e) {
      this.x = this.cursorStartPos.x + (e.pageX - this.cursorOffset.x)

      this.y = this.cursorStartPos.y + (e.pageY - this.cursorOffset.y)
    },

    mouseup: function (e) {
      this.cursorStartPos = null

      document.removeEventListener('mousemove', this.mousemove)

      document.removeEventListener('mouseup', this.mouseup)
    },

    //

    //  Resize window

    //

    startSizeChange: function (e) {
      let wndRect = this.$el.getBoundingClientRect()

      this.stateAtSizeChangeStarted = {
        width: wndRect.width,

        height: wndRect.height,

        cursorX: e.pageX,

        cursorY: e.pageY
      }

      document.addEventListener('mousemove', this.whileSizeChange, false)

      document.addEventListener('mouseup', this.endSizeChange, false)
    },

    whileSizeChange: function (e) {
      this.width =
        this.stateAtSizeChangeStarted.width +
        e.pageX -
        this.stateAtSizeChangeStarted.cursorX

      this.height =
        this.stateAtSizeChangeStarted.height +
        e.pageY -
        this.stateAtSizeChangeStarted.cursorY
    },

    endSizeChange: function (e) {
      document.removeEventListener('mousemove', this.whileSizeChange, false)

      document.removeEventListener('mouseup', this.endSizeChange, false)
    }

  }

}
