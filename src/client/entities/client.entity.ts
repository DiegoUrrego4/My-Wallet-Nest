import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { AccountEntity } from '../../account/entities/account.entity';
import { TokenEntity } from 'src/token/entities/token.entity';
import { AplicationEntity } from 'src/aplication/entities/aplication.entity';

@Index('client_cli_email_Idx', ['cliEmail'], { unique: true })
@Index('pkclient', ['cliId'], { unique: true })
@Index('client_cli_phone_Idx', ['cliPhone'], { unique: true })
@Entity('client', { schema: 'public' })
export class ClientEntity {
  @Column('uuid', { primary: true, name: 'cli_id' })
  cliId: string;

  @Column('character varying', { name: 'cli_full_name', length: 500 })
  cliFullName: string;

  @Column('character varying', { name: 'cli_email', length: 500 })
  cliEmail: string;

  @Column('character varying', { name: 'cli_phone', length: 500 })
  cliPhone: string;

  @Column('character varying', { name: 'cli_photo', length: 500 })
  cliPhoto: string;

  @Column('integer', { name: 'cli_state', default: () => '1' })
  cliState: number;

  @Column('timestamp without time zone', {
    name: 'cli_created_at',
    default: () => 'now()',
  })
  cliCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'cli_updated_at',
    nullable: true,
  })
  cliUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cli_deleted_at',
    nullable: true,
  })
  cliDeletedAt: Date | null;

  @OneToOne(() => AccountEntity, (account) => account.cli)
  account: AccountEntity;

  @OneToOne(() => AplicationEntity, (app) => app.cli)
  app: AplicationEntity;

  @OneToMany(() => TokenEntity, (token) => token.cli)
  tokens: TokenEntity[];
}