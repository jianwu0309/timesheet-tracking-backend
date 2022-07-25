import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AuditColumn } from './audit-column';

@Entity('users')
export class User extends AuditColumn {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'character varying',
  })
  public firstName: string;

  @Column({
    type: 'character varying',
    nullable: true
  })
  public lastName: string;

  @Column({
    type: 'character varying',
  })
  public email: string;

  @Column({
    type: 'character varying',
    length: 100
  })
  public phoneNumber: string;

  @Column({
    type: 'character varying',
    length: 100,
    select: false
  })
  public password: string;

  @Column({
    type: 'timestamp',
  })
  public lastLoginAt: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  public isEmailVerified: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  public isApproved: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  public isAdmin: boolean;

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
