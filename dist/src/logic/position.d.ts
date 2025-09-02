import Vue from 'vue';
import { CursorOffset, CursorPosition, StateAtSizeChangeStarted, SelectButton } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue>, {
    wndID: number;
    x: number | null;
    y: number | null;
    cursorOffset: CursorOffset;
    cursorStartPos: CursorPosition | null;
    stateAtSizeChangeStarted: StateAtSizeChangeStarted;
    width: number;
    height: number;
}, {
    enter(): void;
    setInitialState(): void;
    mousedown(e: MouseEvent): void;
    mousemove(e: MouseEvent): void;
    mouseup(): void;
    startSizeChange(e: MouseEvent): void;
    whileSizeChange(e: MouseEvent): void;
    endSizeChange(): void;
}, {
    _width: string;
    _height: string;
    _x: string;
    _y: string;
    zIndex: number;
    windowStyle: {
        width: string;
        height: string;
        left: string;
        top: string;
        zIndex: number;
    };
}, {
    initialPosition: number[];
    sizeChangeEnable: boolean;
    initialWidth: number;
    initialHeight: number;
    selectButtons: SelectButton[];
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin>;
export default _default;
//# sourceMappingURL=position.d.ts.map