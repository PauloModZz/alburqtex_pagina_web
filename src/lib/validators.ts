export interface PasswordCheck {
  valid: boolean;
  issues: string[];
}

// Mínimo 8 caracteres, al menos una letra y al menos un número.
export function checkPasswordStrength(password: string): PasswordCheck {
  const issues: string[] = [];
  if (password.length < 8) issues.push('Al menos 8 caracteres');
  if (!/[a-zA-Z]/.test(password)) issues.push('Al menos una letra');
  if (!/[0-9]/.test(password)) issues.push('Al menos un número');
  return { valid: issues.length === 0, issues };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
