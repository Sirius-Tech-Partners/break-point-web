import { test, expect } from '@playwright/test'

// Smoke test: Home page loads
// Remaining 4 smoke tests (WhatsApp button, La Cancha pricing,
// Eventos form success, Eventos form errors) are added in Story 6.3
// once all pages are implemented.
test('home page loads with correct title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Break Point/)
})
