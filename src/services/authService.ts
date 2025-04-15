// src/services/authService.ts

export const ALLOWED_DOMAIN = '@gruponissauto.com.mx';

export function isValidInstitutionalEmail(email: string): boolean {
  return email.toLowerCase().endsWith(ALLOWED_DOMAIN);
}
