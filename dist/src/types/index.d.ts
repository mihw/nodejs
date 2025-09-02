export interface WindowStatus {
    zIndex: number;
}
export interface WindowStatuses {
    [key: string]: WindowStatus;
}
export interface StoreState {
    wndStatuses: WindowStatuses;
    wndCount: number;
    maxWndZIndex: number;
}
export interface CursorOffset {
    x: number;
    y: number;
}
export interface CursorPosition {
    x: number;
    y: number;
}
export interface StateAtSizeChangeStarted {
    width: number;
    height: number;
    cursorX: number;
    cursorY: number;
}
export interface WindowPayload {
    wndID: string | number;
}
export interface SelectButton {
    text: string;
    action: () => void;
}
//# sourceMappingURL=index.d.ts.map