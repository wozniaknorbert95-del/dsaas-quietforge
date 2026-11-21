/**
 * Shared intake/waitlist mail config for Cloudflare Pages Functions.
 * Secrets (RESEND_API_KEY) live only in the Pages dashboard — never in the repo.
 */

export const INTAKE_TO_DEFAULT = 'hello@quietforge.nl';
export const INTAKE_FROM_DEFAULT = 'Quietforge <hello@quietforge.nl>';

export interface IntakeMailEnv {
  RESEND_API_KEY?: string;
  INTAKE_FROM?: string;
  INTAKE_TO?: string;
  INTAKE_DISABLED?: string;
}

export function intakeFrom(env: IntakeMailEnv): string {
  return env.INTAKE_FROM?.trim() || INTAKE_FROM_DEFAULT;
}

export function intakeTo(env: IntakeMailEnv): string {
  return env.INTAKE_TO?.trim() || INTAKE_TO_DEFAULT;
}

/** Ready when Resend is configured and intake is not explicitly disabled. */
export function isIntakeMailReady(env: IntakeMailEnv): boolean {
  return env.INTAKE_DISABLED !== 'true' && Boolean(env.RESEND_API_KEY?.trim());
}