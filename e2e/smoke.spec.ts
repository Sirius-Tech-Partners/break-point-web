import { test, expect } from '@playwright/test'

// ─── Test 1: Home page loads ──────────────────────────────────────────────────
test('home page loads with correct title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Break Point/)
})

// ─── Test 2: Floating WhatsApp button ────────────────────────────────────────
test('floating WhatsApp button is visible and links to correct number', async ({ page }) => {
  // Use mobile viewport where the floating button is visible
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')

  const btn = page.getByRole('link', { name: /contactar por whatsapp/i })
  await expect(btn).toBeVisible()

  const href = await btn.getAttribute('href')
  expect(href).toMatch(/wa\.me\/59170690685/)
})

// ─── Test 3: Field page pricing ──────────────────────────────────────────────
test('field page shows day and night pricing', async ({ page }) => {
  await page.goto('/field')
  await expect(page.getByText(/Bs\s*120/)).toBeVisible()
  await expect(page.getByText(/Bs\s*130/)).toBeVisible()
})

// ─── Test 4: Events form — inline errors on invalid submission ────────────────
test('events form shows inline errors on empty submission', async ({ page }) => {
  await page.goto('/events')

  // Submit the form empty
  await page.getByRole('button', { name: /enviar consulta/i }).click()

  // Wait for server Zod validation to return field errors
  await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 8000 })

  // Required field errors should appear inline
  await expect(page.locator('#nombre-error')).toBeVisible()
  await expect(page.locator('#telefono-error')).toBeVisible()
  await expect(page.locator('#fecha-error')).toBeVisible()
})

// ─── Test 5: Events form — success banner ────────────────────────────────────
// Requires RESEND_API_KEY + CONTACT_RECEIVER_EMAIL env vars.
// Skipped in CI unless secrets are configured.
test('events form success shows confirmation banner', async ({ page }) => {
  test.skip(
    !process.env.RESEND_API_KEY,
    'Skipped: requires RESEND_API_KEY secret — configure in GitHub Actions secrets to enable'
  )

  await page.goto('/events')

  // Calculate a valid date (3+ days from today)
  const future = new Date()
  future.setDate(future.getDate() + 7)
  const fechaStr = future.toISOString().split('T')[0]

  await page.fill('#nombre', 'Test Usuario')
  await page.fill('#telefono', '70690685')
  await page.fill('#fecha', fechaStr)
  await page.selectOption('#tipo', 'cumpleanos')

  await page.getByRole('button', { name: /enviar consulta/i }).click()

  await expect(page.getByText(/Mensaje enviado/i)).toBeVisible({ timeout: 15000 })
})
