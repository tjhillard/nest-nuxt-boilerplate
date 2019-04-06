import { FindOneOptions } from "typeorm";

export interface IResourceQueryOptions {
  build(): FindOneOptions;
}
