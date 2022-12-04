import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ClientEntity } from '../../client/entities/client.entity';
import { v4 as uuid } from 'uuid';

@Index('token_cli_id_Idx', ['clientId'], {})
@Index('pktoken', ['id'], { unique: true })
@Entity('token', { schema: 'public' })
export class TokenEntity {
  @Column('uuid', { primary: true, name: 'tok_id' })
  id: string = uuid();

  @Column('uuid', { name: 'cli_id' })
  clientId: string;

  @Column('character varying', { name: 'tok_token', length: 500 })
  token: string;

  @Column('timestamp without time zone', { name: 'tok_fecha_expiracion' })
  fechaExpiracion: Date;

  @ManyToOne(() => ClientEntity, (client) => client.tokens, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  cli: ClientEntity;
}
