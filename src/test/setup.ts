import '@testing-library/jest-dom/vitest'

// Headless UI's anchor positioning observes elements via ResizeObserver,
// which jsdom does not implement.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver
