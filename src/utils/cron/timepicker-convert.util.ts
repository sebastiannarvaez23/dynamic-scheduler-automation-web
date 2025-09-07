export const timeToCron = (time: string): string => {
    if (!time || !/^\d{2}:\d{2}$/.test(time)) {
        throw new Error("Formato inválido, use HH:mm");
    }

    const [hours, minutes] = time.split(":").map(Number);

    return `0 ${minutes} ${hours} * * *`;
};

export const cronToTime = (cron: string): string => {
    if (!cron) {
        throw new Error("La expresión cron no puede estar vacía");
    }

    const parts = cron.trim().split(" ");
    if (parts.length < 6) {
        throw new Error("Expresión cron inválida, debe tener al menos 6 campos");
    }

    const minutes = parts[1];
    const hours = parts[2];

    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");

    return `${hh}:${mm}`;
};