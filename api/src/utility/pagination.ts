import { SelectQueryBuilder } from 'typeorm';

export class Pagination<T> {
    page: number;
    pages: number;
    count: number;
    items: T[];
}

export async function toPaginationResult<T>(query: SelectQueryBuilder<T>, page: number, take: number): Promise<Pagination<T>> {
    const skip = (page - 1) * take;
    const [items, count] = await query.skip(skip).take(take).getManyAndCount();

    const result = new Pagination<T>();
    result.page = page;
    result.pages = Math.max(1, Math.ceil(count / take));
    result.count = count;
    result.items = items;

    return result;
}

export async function toPaginationResultTransform<TQ, TR>(query: SelectQueryBuilder<TQ>, page: number, take: number, transform: (item: TQ) => TR): Promise<Pagination<TR>> {
    const skip = (page - 1) * take;
    const [items, count] = await query.skip(skip).take(take).getManyAndCount();

    const result = new Pagination<TR>();
    result.page = page;
    result.pages = Math.max(1, Math.ceil(count / take));
    result.count = count;
    result.items = items.map(transform);

    return result;
}