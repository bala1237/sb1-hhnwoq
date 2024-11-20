import { http } from 'msw'
import { setupWorker } from 'msw/browser'
import { enterpriseHandlers } from './handlers/enterprise'

// Create the worker instance
export const worker = setupWorker(...enterpriseHandlers)

// Export for use in providers
export const startWorker = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    // Initialize the worker
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
    
    console.log('[MSW] Mock Service Worker started')
  }
}