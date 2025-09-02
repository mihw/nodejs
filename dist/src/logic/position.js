import Vue from 'vue';
export default Vue.extend({
    data() {
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
        };
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
        },
        selectButtons: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        _width() {
            return this.width ? `${this.width}px` : 'auto';
        },
        _height() {
            return this.height ? `${this.height}px` : 'auto';
        },
        _x() {
            return `${this.x}px`;
        },
        _y() {
            return `${this.y}px`;
        },
        zIndex() {
            return this.$store.state.wndStatuses[this.wndID]?.zIndex || 0;
        },
        windowStyle() {
            return {
                width: this._width,
                height: this._height,
                left: this._x,
                top: this._y,
                zIndex: this.zIndex
            };
        }
    },
    created() {
        this.wndID = this.$store.state.wndCount;
        this.$store.dispatch('setWndStatuses', {
            wndID: this.$store.state.wndCount
        });
    },
    methods: {
        enter() {
            this.setInitialState();
        },
        setInitialState() {
            if (!this.$el || !this.$refs.wndInner)
                return;
            let buttonItemRect = null;
            if (this.selectButtons.length && this.$refs.buttonOuter) {
                buttonItemRect = this.$refs.buttonOuter.getBoundingClientRect();
            }
            const innerItemRect = this.$refs.wndInner.getBoundingClientRect();
            this.width = this.initialWidth || innerItemRect.width;
            this.height =
                (this.initialHeight || innerItemRect.height) +
                    22 +
                    (this.selectButtons.length && buttonItemRect
                        ? buttonItemRect.height
                        : 0);
            if (this.x !== null && this.y !== null)
                return;
            if (this.initialPosition && this.initialPosition.length === 2) {
                this.x = this.initialPosition[0];
                this.y = this.initialPosition[1];
            }
            else {
                this.x = window.innerWidth / 2 - this.$el.clientWidth / 2;
                this.y = window.innerHeight / 2 - this.$el.clientHeight / 2;
            }
        },
        mousedown(e) {
            this.cursorOffset.x = e.pageX;
            this.cursorOffset.y = e.pageY;
            this.cursorStartPos = {
                x: this.x || 0,
                y: this.y || 0
            };
            document.addEventListener('mousemove', this.mousemove);
            document.addEventListener('mouseup', this.mouseup);
            this.$store.dispatch('moveWndToTop', {
                wndID: this.wndID
            });
        },
        mousemove(e) {
            if (!this.cursorStartPos)
                return;
            this.x = this.cursorStartPos.x + (e.pageX - this.cursorOffset.x);
            this.y = this.cursorStartPos.y + (e.pageY - this.cursorOffset.y);
        },
        mouseup() {
            this.cursorStartPos = null;
            document.removeEventListener('mousemove', this.mousemove);
            document.removeEventListener('mouseup', this.mouseup);
        },
        startSizeChange(e) {
            const wndRect = this.$el.getBoundingClientRect();
            this.stateAtSizeChangeStarted = {
                width: wndRect.width,
                height: wndRect.height,
                cursorX: e.pageX,
                cursorY: e.pageY
            };
            document.addEventListener('mousemove', this.whileSizeChange, false);
            document.addEventListener('mouseup', this.endSizeChange, false);
        },
        whileSizeChange(e) {
            this.width =
                this.stateAtSizeChangeStarted.width +
                    e.pageX -
                    this.stateAtSizeChangeStarted.cursorX;
            this.height =
                this.stateAtSizeChangeStarted.height +
                    e.pageY -
                    this.stateAtSizeChangeStarted.cursorY;
        },
        endSizeChange() {
            document.removeEventListener('mousemove', this.whileSizeChange, false);
            document.removeEventListener('mouseup', this.endSizeChange, false);
        }
    }
});
//# sourceMappingURL=position.js.map