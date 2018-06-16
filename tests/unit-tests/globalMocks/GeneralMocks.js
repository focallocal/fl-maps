
const geolocation = {
  getCurrentPosition: () => {}
}

global.navigator.geolocation = geolocation

// Internals
window.__setDocumentTitle = jest.fn()
