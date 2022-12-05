import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ClientEntity } from '../../client/entities/client.entity';
import { v4 as uuid } from 'uuid';

@Index('pkapp', ['id'], { unique: true })
@Index('app_cli_id_Idx', ['clientId'], { unique: true })
@Entity('app', { schema: 'public' })
export class AplicationEntity {
  @Column('uuid', { primary: true, name: 'app_id' })
  id: string = uuid();

  @Column('uuid', { name: 'cli_id' })
  clientId: string;

  @Column('character varying', {
    name: 'app_color',
    length: 30,
    default: () => "'#007aff'",
  })
  appColor: string;

  @Column('timestamp without time zone', {
    name: 'app_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'app_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.app, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  cli: ClientEntity;
}
