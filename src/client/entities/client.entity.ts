import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { AccountEntity } from '../../account/entities/account.entity';
import { TokenEntity } from '../../token/entities/token.entity';
import { AplicationEntity } from '../../aplication/entities/aplication.entity';
import { v4 as uuid } from 'uuid';

@Index('client_cli_email_Idx', ['email'], { unique: true })
@Index('pkclient', ['id'], { unique: true })
@Index('client_cli_phone_Idx', ['phone'], { unique: true })
@Entity('client', { schema: 'public' })
export class ClientEntity {
  @Column('uuid', { primary: true, name: 'cli_id' })
  id: string = uuid();

  @Column('character varying', { name: 'cli_full_name', length: 500 })
  name: string;

  @Column('character varying', { name: 'cli_email', length: 500 })
  email: string;

  @Column('character varying', { name: 'cli_phone', length: 500 })
  phone: string;

  @Column('character varying', { name: 'cli_photo', length: 500 })
  picture: string;

  @Column('integer', { name: 'cli_state', default: () => '1' })
  state: number;

  @Column('timestamp without time zone', {
    name: 'cli_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cli_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cli_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToOne(() => AccountEntity, (account) => account.cli, {
    cascade: true,
    eager: true,
  })
  account: AccountEntity;

  @OneToOne(() => AplicationEntity, (app) => app.cli, {
    cascade: true,
    eager: true,
  })
  app: AplicationEntity;

  @OneToMany(() => TokenEntity, (token) => token.cli)
  tokens: TokenEntity[];
}
