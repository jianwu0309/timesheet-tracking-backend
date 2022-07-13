import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column } from 'typeorm';

@Entity('listOfValues')
export class ListOfValue {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'character varying',
  })
  public value: string;

  @Column({
    type: 'character varying',
    length: 100
  })
  public key: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  public isActive: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  public isDeleted: boolean;
}
