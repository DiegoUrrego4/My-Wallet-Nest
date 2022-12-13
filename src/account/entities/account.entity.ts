import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { ClientEntity } from '../../client/entities/client.entity';
import { MovementEntity } from '../../movement/entities/movement.entity';
import { v4 as uuid } from 'uuid';

@Index('pkaccount', ['id'], { unique: true })
@Index('account_cli_id_Idx', ['clientId'], { unique: true })
@Entity('account', { schema: 'public' })
export class AccountEntity {
  @Column('uuid', { primary: true, name: 'acc_id' })
  id: string = uuid();

  @Column('uuid', { name: 'cli_id' })
  clientId: string;

  @Column('bigint', { name: 'acc_balance', default: () => '0' })
  balance: string;

  @Column('bigint', { name: 'acc_credit', default: () => '50000000' })
  credit: string;

  @Column('integer', { name: 'acc_state', default: () => '1' })
  state: number;

  @Column('timestamp without time zone', {
    name: 'acc_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'acc_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'acc_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.account, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  cli: ClientEntity;

  @OneToMany(() => MovementEntity, (movement) => movement.income, {
    cascade: true,
    eager: true,
  })
  incomes: MovementEntity[];

  @OneToMany(() => MovementEntity, (movement) => movement.outcome, {
    cascade: true,
    eager: true,
  })
  outcomes: MovementEntity[];
}
