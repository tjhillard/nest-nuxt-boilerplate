export interface ICrudableEntity {
  id: number | string;
  deleted_at: Date;
  serialize: () => any;
}