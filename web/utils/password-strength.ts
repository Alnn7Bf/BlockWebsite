export const strengthColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-lime-500",
    "text-green-500",
] as const;

export function getPasswordStrength(password : string) {
    let score = 0;

    const checks = {
        length: password.length >= 8,
        letter: /[a-zA-Z]/.test(password),
        number: /\d/.test(password),
        special: /[^a-zA-Z0-9]/.test(password),
    }

    if (checks.length) score++;
    if (checks.letter) score++;
    if (checks.number) score++;
    if (checks.special) score++;

    const labels = [
        "Muy débil",
        "Débil",
        "Aceptable",
        "Buena",
        "Fuerte",
    ];

    return {
        score,
        label: labels[score],
        checks,
    };
}