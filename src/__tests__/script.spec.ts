import scriptMixin from '../logic/script'

const mixinOptions = (scriptMixin as any).options || scriptMixin

describe('Script Logic', () => {
  let component: any

  beforeEach(() => {
    global.alert = jest.fn()
    
    component = {
      methods: mixinOptions.methods
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('clear method', () => {
    test('should call alert with "clear"', () => {
      component.methods.clear()
      
      expect(global.alert).toHaveBeenCalledTimes(1)
      expect(global.alert).toHaveBeenCalledWith('clear')
    })

    test('should be callable multiple times', () => {
      component.methods.clear()
      component.methods.clear()
      component.methods.clear()
      
      expect(global.alert).toHaveBeenCalledTimes(3)
      expect(global.alert).toHaveBeenCalledWith('clear')
    })
  })

  describe('methods object structure', () => {
    test('should have methods property', () => {
      expect(component.methods).toBeDefined()
      expect(typeof component.methods).toBe('object')
    })

    test('should have clear method', () => {
      expect(component.methods.clear).toBeDefined()
      expect(typeof component.methods.clear).toBe('function')
    })
  })
})