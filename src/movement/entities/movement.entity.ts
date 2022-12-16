import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from '../../account/entities/account.entity';
import { v4 as uuid } from 'uuid';

@Index(
  'movement_acc_id_income_acc_id_outcome_Idx',
  ['idIncome', 'idOutcome'],
  {},
)
@Index('pkmovement', ['id'], { unique: true })
@Entity('movement', { schema: 'public' })
export class MovementEntity {
  @Column('uuid', { primary: true, name: 'mov_id' })
  id: string = uuid();

  @Column('uuid', { name: 'acc_id_income' })
  idIncome: string;

  @Column('uuid', { name: 'acc_id_outcome' })
  idOutcome: string;

  @Column('character varying', { name: 'mov_reason', length: 500 })
  reason: string;

  @Column('bigint', { name: 'mov_amount' })
  amount: string;

  @Column('integer', { name: 'mov_fees', default: () => '1' })
  fees: number;

  @Column('timestamp without time zone', {
    name: 'mov_datetime',
    default: () => 'now()',
  })
  datetime: Date;

  @ManyToOne(() => AccountEntity, (account) => account.incomes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_income', referencedColumnName: 'id' }])
  income: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.outcomes, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_outcome', referencedColumnName: 'id' }])
  outcome: AccountEntity;
}
