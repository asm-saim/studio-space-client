export const PASSWORD_RULES = [
  { id: "upper", label: "An uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { id: "lower", label: "A lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { id: "length", label: "At least 6 characters", test: (v: string) => v.length >= 6 },
] as const;
 
/** Labels of the rules the password still fails (empty array = valid). */
export function getPasswordErrors(value: string): string[] {
  return PASSWORD_RULES.filter((rule) => !rule.test(value)).map((rule) => rule.label);
}