/**
 * Utility methods for resource service classes
 */
export class BaseService {
  protected getSerializedEntity(resource: any) {
    return resource.serialize ? resource.serialize() : resource;
  }
}
