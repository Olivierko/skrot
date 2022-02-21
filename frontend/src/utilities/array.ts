export const remove = <T>(source: Array<T>, item: T) => {
    const index = source.indexOf(item);
    source.splice(index, 1);
};

export const move = <T>(source: Array<T>, from: number, to: number) => {
    source.splice(to, 0, source.splice(from, 1)[0]);
};

export const moveUp = <T>(source: Array<T>, item: T) => {
    const index = source.indexOf(item);
    const upIndex = Math.max(0, index - 1);
    move(source, index, upIndex);
};

export const moveDown = <T>(source: Array<T>, item: T) => {
    const index = source.indexOf(item);
    const downIndex = Math.min(source.length, index + 1);
    move(source, index, downIndex);
};