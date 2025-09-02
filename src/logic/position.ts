import Vue from 'vue'
import { CursorOffset, CursorPosition, StateAtSizeChangeStarted, SelectButton } from '../types'

export default Vue.extend({
  data(): {
    wndID: number;
    x: number | null;
    y: number | null;
    cursorOffset: CursorOffset;
    cursorStartPos: CursorPosition | null;
    stateAtSizeChangeStarted: StateAtSizeChangeStarted;
    width: number;
    height: number;
  } {
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
      type: Array as () => number[],
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
    },
    selectButtons: {
      type: Array as () => SelectButton[],
      default: () => []
    }
  },

  computed: {
    _width(): string {
      return this.width ? `${this.width}px` : 'auto'
    },
    _height(): string {
      return this.height ? `${this.height}px` : 'auto'
    },
    _x(): string {
      return `${this.x}px`
    },
    _y(): string {
      return `${this.y}px`
    },
    zIndex(): number {
      return this.$store.state.wndStatuses[this.wndID]?.zIndex || 0
    },
    windowStyle(): {
      width: string;
      height: string;
      left: string;
      top: string;
      zIndex: number;
    } {
      return {
        width: this._width,
        height: this._height,
        left: this._x,
        top: this._y,
        zIndex: this.zIndex
      }
    }
  },

  created(): void {
    this.wndID = this.$store.state.wndCount
    this.$store.dispatch('setWndStatuses', {
      wndID: this.$store.state.wndCount
    })
  },

  methods: {
    enter(): void {
      this.setInitialState()
    },

    setInitialState(): void {
      if (!this.$el || !(this.$refs.wndInner as HTMLElement)) return

      let buttonItemRect: DOMRect | null = null

      if (this.selectButtons.length && this.$refs.buttonOuter) {
        buttonItemRect = (this.$refs.buttonOuter as HTMLElement).getBoundingClientRect()
      }

      const innerItemRect = (this.$refs.wndInner as HTMLElement).getBoundingClientRect()

      this.width = this.initialWidth || innerItemRect.width

      this.height =
        (this.initialHeight || innerItemRect.height) +
        22 +
        (this.selectButtons.length && buttonItemRect
          ? buttonItemRect.height
          : 0)

      if (this.x !== null && this.y !== null) return

      if (this.initialPosition && this.initialPosition.length === 2) {
        this.x = this.initialPosition[0]
        this.y = this.initialPosition[1]
      } else {
        this.x = window.innerWidth / 2 - (this.$el as HTMLElement).clientWidth / 2
        this.y = window.innerHeight / 2 - (this.$el as HTMLElement).clientHeight / 2
      }
    },

    mousedown(e: MouseEvent): void {
      this.cursorOffset.x = e.pageX
      this.cursorOffset.y = e.pageY

      this.cursorStartPos = {
        x: this.x || 0,
        y: this.y || 0
      }

      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)

      this.$store.dispatch('moveWndToTop', {
        wndID: this.wndID
      })
    },

    mousemove(e: MouseEvent): void {
      if (!this.cursorStartPos) return
      this.x = this.cursorStartPos.x + (e.pageX - this.cursorOffset.x)
      this.y = this.cursorStartPos.y + (e.pageY - this.cursorOffset.y)
    },

    mouseup(): void {
      this.cursorStartPos = null
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },

    startSizeChange(e: MouseEvent): void {
      const wndRect = (this.$el as HTMLElement).getBoundingClientRect()

      this.stateAtSizeChangeStarted = {
        width: wndRect.width,
        height: wndRect.height,
        cursorX: e.pageX,
        cursorY: e.pageY
      }

      document.addEventListener('mousemove', this.whileSizeChange, false)
      document.addEventListener('mouseup', this.endSizeChange, false)
    },

    whileSizeChange(e: MouseEvent): void {
      this.width =
        this.stateAtSizeChangeStarted.width +
        e.pageX -
        this.stateAtSizeChangeStarted.cursorX

      this.height =
        this.stateAtSizeChangeStarted.height +
        e.pageY -
        this.stateAtSizeChangeStarted.cursorY
    },

    endSizeChange(): void {
      document.removeEventListener('mousemove', this.whileSizeChange, false)
      document.removeEventListener('mouseup', this.endSizeChange, false)
    }
  }
})