import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Request } from 'express';

import { BaseService } from 'src/shared/base/base.service';
import { ResourceQueryOptions } from './resource-query-options';
import { CollectionQueryOptions } from './collection-query-options';
import { ICrudableEntity } from './interfaces/crudable-entity.interface';

export class CrudService extends BaseService {
  constructor(protected repository: Repository<any>) {
    super();
  }

  public async read(req: Request): Promise<any> {
    return this.getSingleResource(req);
  }

  public async index(req: Request): Promise<any[]> {
    return this.getMultipleResources(req);
  }

  public async create(req: Request): Promise<any> {
    const newResource = await this.repository.create({ ...req.body });
    await this.repository.save(newResource);
    return newResource;
  }

  public async update(req: Request): Promise<any> {
    await this.repository.findOneOrFail({ where: { id: req.params.id, deleted_at: null } });
    await this.repository.update(req.params.id, req.body);
    return await this.repository.findOne(req.params.id);
  }

  public async delete(req: Request): Promise<void> {
    await this.repository.findOneOrFail({ where: { id: req.params.id, deleted_at: null } });
    await this.repository.update(req.params.id, { deleted_at: null });
    return;
  }

  private async getSingleResource(req: Request): Promise<ICrudableEntity> {
    const resource: ICrudableEntity = await this.repository.findOneOrFail({
      where: {
        id: req.params.id,
        deleted_at: null,
      },
      ...this.buildResourceQueryOptions(req.query),
    });
    return this.getSerializedEntity(resource);
  }

  private async getMultipleResources(req: Request): Promise<ICrudableEntity[]> {
    const collection: ICrudableEntity[] = await this.repository.find({
      where: {
        deleted_at: null,
      },
      ...this.buildCollectionQueryOptions(req.query),
    });
    return collection.map(resource => this.getSerializedEntity(resource));
  }

  private buildResourceQueryOptions(reqQuery): FindOneOptions {
    return new ResourceQueryOptions(reqQuery).build();
  }

  private buildCollectionQueryOptions(reqQuery): FindManyOptions {
    return new CollectionQueryOptions(reqQuery).build();
  }
}
