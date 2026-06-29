export function normalizeDomain(value: string) : string | null {
    let input = value.trim().toLowerCase();

    if (!input) return null;

    if (!input.startsWith("http://") && !input.startsWith("https://")) {
        input = `https://${input}`;
    }

    try {
        const hostname = new URL(input)
            .hostname
            .replace(/^www\./, "");
        
        const regex = /^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i;

        if(!regex.test(hostname)) {
            return null;
        }

        return hostname;
    } catch {
        return null;
    }
}