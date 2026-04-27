'use server'

import { contactSchema } from './schema'

export type ActionResult =
  | { success: true; message: string }
  | { error: 'rate_limit' | 'validation' | 'server' | 'config' }
  | { errors: Record<string, string[]> }

export async function contactAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult | null> {
  const raw = Object.fromEntries(formData)
  const result = contactSchema.safeParse(raw)

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors as Record<string, string[]> }
  }

  // E4.4: rate limiting + Resend email here
  return null
}
