import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/*
    @Entity() : to tell TypeORM that this is an entity
    @PrimaryGeneratedColumn() :  to tell TypeORM that this is the primary key of the table
    @Column : to tell TypeORM that this is a column of the table

    we are creating a User entity with 3 columns : id, name and email
*/

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
