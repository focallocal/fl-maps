/**
 * Global TypeScript declarations for FL-Maps
 * This file tells TypeScript about global variables that exist at runtime
 */

declare global {
  interface Window {
    // Map type configuration
    __mapType: string
    
    // Edit mode data
    __editData: any
    __unfinishedNewEvent: any
    __updatedData: any
    
    // User location cache
    __savedUserLocation: any
    
    // Document title setter
    __setDocumentTitle: (page: string) => void
    
    // Timing/debugging system
    FlMapsTiming: {
      enabled: boolean
      init: () => void
      log: (eventName: string, details?: any) => void
    }
    
    // Map state cache
    previousStateOfMap: any
    cachedDataForPage: any
    
    // External libraries
    FB: any  // Facebook SDK
    gapi: any  // Google API
    google: any  // Google Maps
    NProgress: any  // Progress bar library
  }
}

// Meteor globals
declare const Meteor: any
declare const Roles: any
declare const DDPRateLimiter: any
declare const Mongo: any
declare const Accounts: any

export {}
