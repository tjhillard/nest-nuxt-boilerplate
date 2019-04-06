import { FindManyOptions } from "typeorm";
import { ICollectionQueryOptions } from './interfaces/collection-query-options.interface';

export class CollectionQueryOptions implements ICollectionQueryOptions {
  constructor(private readonly requestQuery) {}

  public build(): FindManyOptions {
    const options: FindManyOptions = {};

    if (this.requestQuery.fields) { options.select = this.select; }
    if (this.requestQuery.order_by) { options.order = this.order; }
    if (this.requestQuery.limit) { options.take = this.limit; }
    if (this.requestQuery.offset) { options.skip = this.offset; }
    if (this.requestQuery.page_size) { options.take = this.pageSize; }
    if (this.requestQuery.page_number) { options.skip = this.pageNumber; }

    return options;
  }

  private get select() {
    return [...this.requestQuery.fields.split(',')];
  }

  private get order() {
    const orderBy = this.requestQuery.order_by.split('.');
    const orderByProperty = orderBy[0] || this.requestQuery.order_by;
    const orderDirection = (orderBy[1] || 'asc').toUpperCase();
    return {
      [orderByProperty]: orderDirection,
    };
  }

  private get limit() {
    return this.requestQuery.limit;
  }

  private get offset() {
    return this.requestQuery.offset;
  }

  private get pageSize() {
    return this.requestQuery.page_size;
  }

  private get pageNumber() {
    return (this.requestQuery.page_number - 1) * this.pageSize;
  }
}
