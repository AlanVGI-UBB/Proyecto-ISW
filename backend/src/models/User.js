import { EntitySchema } from 'typeorm';

export const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    email: {
      type: 'varchar',
      length: 255,
      unique: true,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    nombre: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    apellido: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    rol: {
      type: 'varchar',
      length: 50,
      default: 'estudiante',
      nullable: false,
    },
    activo: {
      type: 'boolean',
      default: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
});
