export interface PasswordCheck {
  valid: boolean;
  issues: string[];
}

export interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

// Lista única de requisitos — la usan tanto el checklist en pantalla (registro
// y cambio de contraseña) como la validación al enviar el formulario, para
// que nunca queden desincronizados.
export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { label: 'Al menos 8 caracteres', test: (p) => p.length >= 8 },
  { label: 'Una mayúscula (A-Z)', test: (p) => /[A-Z]/.test(p) },
  { label: 'Una minúscula (a-z)', test: (p) => /[a-z]/.test(p) },
  { label: 'Un número (0-9)', test: (p) => /[0-9]/.test(p) },
  { label: 'Un símbolo especial (!@#$%...)', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export function checkPasswordStrength(password: string): PasswordCheck {
  const issues = PASSWORD_REQUIREMENTS.filter((r) => !r.test(password)).map((r) => r.label);
  return { valid: issues.length === 0, issues };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
