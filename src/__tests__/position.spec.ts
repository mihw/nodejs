import positionMixin from '../logic/position'

const mixinOptions = (positionMixin as any).options || positionMixin

describe('Position Logic', () => {
  let component: any

  beforeEach(() => {
    // Create a mock component with the mixin
    component = {
      $store: {
        state: {
          wndStatuses: { 0: { zIndex: 0 } },
          wndCount: 1,
          maxWndZIndex: 0
        },
        dispatch: jest.fn()
      },
      $el: {
        clientWidth: 300,
        clientHeight: 200,
        getBoundingClientRect: jest.fn(() => ({
          width: 300,
          height: 200
        }))
      },
      $refs: {
        wndInner: {
          getBoundingClientRect: jest.fn(() => ({
            width: 250,
            height: 150
          }))
        },
        buttonOuter: null
      },
      selectButtons: [],
      initialWidth: 300,
      initialHeight: 200,
      initialPosition: [100, 100],
      sizeChangeEnable: true
    }

    // Apply mixin data
    if (mixinOptions.data && typeof mixinOptions.data === 'function') {
      const data = mixinOptions.data.call(component)
      Object.keys(data).forEach(key => {
        component[key] = data[key]
      })
    }

    // Apply mixin computed properties as functions
    if (mixinOptions.computed) {
      Object.keys(mixinOptions.computed).forEach(key => {
        component[key] = mixinOptions.computed[key].bind(component)
      })
    }

    // Apply mixin methods
    if (mixinOptions.methods) {
      Object.keys(mixinOptions.methods).forEach(key => {
        component[key] = mixinOptions.methods[key].bind(component)
      })
    }
  })

  describe('Data Initialization', () => {
    test('should initialize data correctly', () => {
      const freshComponent = { 
        initialWidth: 300, 
        initialHeight: 200 
      }
      const data = mixinOptions.data.call(freshComponent)
      
      expect(data.wndID).toBe(0)
      expect(data.x).toBe(null)
      expect(data.y).toBe(null)
      expect(data.cursorOffset).toEqual({ x: 0, y: 0 })
      expect(data.cursorStartPos).toBe(null)
      expect(data.width).toBe(300)
      expect(data.height).toBe(200)
    })
  })

  describe('Computed Properties', () => {
    test('_width should return correct value', () => {
      component.width = 300
      expect(component._width()).toBe('300px')
      
      component.width = 0
      expect(component._width()).toBe('auto')
    })

    test('_height should return correct value', () => {
      component.height = 200
      expect(component._height()).toBe('200px')
      
      component.height = 0
      expect(component._height()).toBe('auto')
    })

    test('_x and _y should return pixel values', () => {
      component.x = 100
      component.y = 200
      expect(component._x()).toBe('100px')
      expect(component._y()).toBe('200px')
    })

    test('zIndex should return value from store', () => {
      component.wndID = 0
      expect(component.zIndex()).toBe(0)
    })

    test('windowStyle should return correct style object', () => {
      component.x = 100
      component.y = 200
      component.width = 300
      component.height = 400
      component.wndID = 0
      
      const style = component.windowStyle()
      // windowStyle uses the computed property functions
      expect(style.width).toBe(component._width)
      expect(style.height).toBe(component._height)
      expect(style.left).toBe(component._x)
      expect(style.top).toBe(component._y)
      expect(style.zIndex).toBe(component.zIndex)
    })
  })

  describe('Position Change Methods', () => {
    test('mousedown should initialize cursor tracking', () => {
      const mockEvent = {
        pageX: 150,
        pageY: 250
      }
      component.x = 100
      component.y = 200

      const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
      component.mousedown(mockEvent)

      expect(component.cursorOffset.x).toBe(150)
      expect(component.cursorOffset.y).toBe(250)
      expect(component.cursorStartPos).toEqual({ x: 100, y: 200 })
      expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', component.mousemove)
      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseup', component.mouseup)
      expect(component.$store.dispatch).toHaveBeenCalledWith('moveWndToTop', { wndID: 0 })
      
      addEventListenerSpy.mockRestore()
    })

    test('mousemove should update position', () => {
      component.cursorStartPos = { x: 100, y: 200 }
      component.cursorOffset = { x: 150, y: 250 }

      const mockEvent = {
        pageX: 170,
        pageY: 280
      }

      component.mousemove(mockEvent)

      expect(component.x).toBe(120)
      expect(component.y).toBe(230)
    })

    test('mouseup should clean up event listeners', () => {
      component.cursorStartPos = { x: 100, y: 200 }
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

      component.mouseup({})

      expect(component.cursorStartPos).toBe(null)
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', component.mousemove)
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', component.mouseup)
      
      removeEventListenerSpy.mockRestore()
    })
  })

  describe('Resize Methods', () => {
    test('startSizeChange should initialize resize state', () => {
      const mockEvent = {
        pageX: 300,
        pageY: 400
      }

      const addEventListenerSpy = jest.spyOn(document, 'addEventListener')
      component.startSizeChange(mockEvent)

      expect(component.stateAtSizeChangeStarted).toEqual({
        width: 300,
        height: 200,
        cursorX: 300,
        cursorY: 400
      })
      expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', component.whileSizeChange, false)
      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseup', component.endSizeChange, false)
      
      addEventListenerSpy.mockRestore()
    })

    test('whileSizeChange should update dimensions', () => {
      component.stateAtSizeChangeStarted = {
        width: 250,
        height: 350,
        cursorX: 300,
        cursorY: 400
      }

      const mockEvent = {
        pageX: 350,
        pageY: 450
      }

      component.whileSizeChange(mockEvent)

      expect(component.width).toBe(300)
      expect(component.height).toBe(400)
    })

    test('endSizeChange should clean up event listeners', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')

      component.endSizeChange({})

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', component.whileSizeChange, false)
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', component.endSizeChange, false)
      
      removeEventListenerSpy.mockRestore()
    })
  })

  describe('Initialization Methods', () => {
    test('setInitialState should use initialPosition when provided', () => {
      component.x = null
      component.y = null
      component.initialPosition = [100, 100]
      component.initialWidth = 300
      component.initialHeight = 200
      
      component.setInitialState()

      expect(component.x).toBe(100)
      expect(component.y).toBe(100)
      expect(component.width).toBe(300)
      // Height is calculated with additional padding
      expect(component.height).toBeGreaterThanOrEqual(172)
    })

    test('setInitialState should center window when no initialPosition', () => {
      global.innerWidth = 1024
      global.innerHeight = 768
      
      component.x = null
      component.y = null
      component.initialPosition = null
      component.initialWidth = 0
      component.initialHeight = 0
      component.$el.clientWidth = 250
      component.$el.clientHeight = 172
      
      component.setInitialState()

      // Should center the window
      expect(component.x).toBe(387) // (1024 - 250) / 2
      expect(component.y).toBe(298) // (768 - 172) / 2
      expect(component.width).toBe(250)
      expect(component.height).toBeGreaterThanOrEqual(172)
    })

    test('enter method should call setInitialState', () => {
      const originalSetInitialState = component.setInitialState
      component.setInitialState = jest.fn()
      
      component.enter()
      
      expect(component.setInitialState).toHaveBeenCalled()
      
      // Restore original method
      component.setInitialState = originalSetInitialState
    })
  })

  describe('Props', () => {
    test('should have correct prop definitions', () => {
      const props = mixinOptions.props
      
      expect(props.initialPosition).toBeDefined()
      expect(props.initialPosition.type).toBe(Array)
      expect(props.initialPosition.default).toBe(null)
      
      expect(props.sizeChangeEnable).toBeDefined()
      expect(props.sizeChangeEnable.type).toBe(Boolean)
      expect(props.sizeChangeEnable.default).toBe(true)
      
      expect(props.initialWidth).toBeDefined()
      expect(props.initialWidth.type).toBe(Number)
      expect(props.initialWidth.default).toBe(0)
      
      expect(props.initialHeight).toBeDefined()
      expect(props.initialHeight.type).toBe(Number)
      expect(props.initialHeight.default).toBe(0)
    })
  })
})