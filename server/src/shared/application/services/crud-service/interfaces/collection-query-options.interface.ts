import { FindManyOptions } from "typeorm";

export interface ICollectionQueryOptions {
  build: () => FindManyOptions;
}
