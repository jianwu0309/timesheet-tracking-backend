import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditColumn {
  @UpdateDateColumn()
  public updatedAt: Date;

  @CreateDateColumn()
  public createdAt: Date;
}
