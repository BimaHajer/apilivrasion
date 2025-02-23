import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('livreur')
export class Livreur {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('text', { name: 'firstName', nullable: true })
  firstName: string;

  @Column('text', { name: 'lastName', nullable: true })
  lastName: string;

  @Column('text', { name: 'email', nullable: true, unique: true })
  email: string;

  @Column('text', { name: 'telephone', nullable: true })
  telephone: string;

  // @Column('text', { name: 'password', nullable: true })
  // password: string;

  // @Column('text', { name: 'confirmPassword', nullable: true })
  // confirmPassword: string;

  @Column('text', { name: 'role', default: 'livreur' })
  role: string;

  @Column('text', { name: 'vehicle', nullable: true })
  vehicle: string; 

  @Column('boolean', { name: 'availability', default: true })
  availability: boolean;

  @Column('text', { name: 'token', nullable: true })
  token: string;

  @Column('date',{name:"createAt", nullable: true})
  createAt:Date;
  @Column('date',{name:"update", nullable: true})
  updateAt:Date;
  @Column('integer',{name:"createby",nullable: true})
  createBy:number;
  @Column('integer',{name:"updateBy",nullable:true})
  updatedBy: number;
  @Column('boolean',{name:"active",nullable:true})
  isActive:boolean
}
