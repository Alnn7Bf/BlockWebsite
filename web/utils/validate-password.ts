export default function validatePassword(password: string) {
    const checks = {
        length: password.length >= 8,
        letter: /[a-zA-Z]/.test(password),
        number: /\d/.test(password),
        special: /[^a-zA-Z0-9]/.test(password),
    };
    const errors: string[] = [];

    if (!checks.length) errors.push("La contraseña debe tener al menos 8 caracteres.");

    if (!checks.letter) errors.push("La contraseña debe contener al menos una letra.");

    if (!checks.number) errors.push("La contraseña debe contener al menos un número.");

    if (!checks.special) errors.push("La contraseña debe contener al menos un carácter especial.");

    return {
        valid: errors.length === 0,
        errors,
    };
}