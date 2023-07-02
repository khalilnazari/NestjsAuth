import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterInsert()
  logInsert() {
    console.log('New user inserted. ID:' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User updated. ID:' + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('User removed. ID:' + this.id);
  }
}
