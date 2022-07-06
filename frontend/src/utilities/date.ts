const pad = (n: number) => {
    return (n < 10 ? "0" : "") + n;
};

export const toDatetimeLocal = (date: Date): string => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const toPrettyDate = (date: Date): string => {
    return `${date.toJSON().split('T')[0]} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const toElapsedTime = (ms: number): string => {
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor(ms / 3600000 % 24);
    const minutes = Math.floor(ms / 60000 % 60);
    const seconds = Math.floor(ms / 1000 % 60);

    let result: string = '';

    if (days > 0) {
        result += `${days} days `;
    }

    if (hours > 0) {
        result += `${hours}h `
    }

    if (minutes > 0) {
        result += `${minutes}m `
    }

    if (seconds > 0) {
        result += `${seconds}s `
    }

    return result;
}

export const toDifference = (start: Date, end: Date): string => {
    const ms = end.getTime() - start.getTime();
    return toElapsedTime(ms);
};

export const toWeekNumber = (date: Date): number => {
    var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((+d - +yearStart) / 86400000) + 1)/7);
};