import { FindOneOptions } from 'typeorm';
import { IResourceQueryOptions } from './interfaces/resource-query-options.interface';

export class ResourceQueryOptions implements IResourceQueryOptions {
  constructor(private readonly requestQuery) {}

  public build(): FindOneOptions {
    const options: FindOneOptions = {};

    if (this.requestQuery.fields) { options.select = this.select; }
    if (this.requestQuery.order_by) { options.order = this.order; }

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
}
