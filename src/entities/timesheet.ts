import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column, OneToOne } from 'typeorm';
import { AuditColumn } from './audit-column';

@Entity('timesheet')
export class Timesheet extends AuditColumn {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'character varying',
    length: 100
  })
  public developerTime: string;

  @Column({
    type: 'character varying',
    length: 100
  })
  public developerTimezone: string;

  @Column({
    type: 'character varying',
    length: 100
  })
  public clientTime: string;

  @Column({
    type: 'character varying',
    length: 100
  })
  public clientTimezone: string;

  @Column({
    type: 'character varying',
    length: 100
  })
  public agencyTime: string;

  @Column({
    type: 'character varying',
    length: 100
  })
  public agencyTimezone: string;

  @Column({
    type: 'character varying',
    length: 100
  })
  public country: string;

  @Column({
    type: 'date',
  })
  public date: string;

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
