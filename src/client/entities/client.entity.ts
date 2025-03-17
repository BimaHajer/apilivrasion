import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('text', { name: 'firstName', nullable: true })
  firstName: string;

  @Column('text', { name: 'lastName', nullable: true })
  lastName: string;

  @Column('text', { name: 'email', nullable: true, unique: true })
  email: string;

  @Column('text', { name: 'phone', nullable: true })
  phone: string;

  @Column('text', { name: 'address', nullable: true })
  address: string;

  @Column('text', { name: 'password', nullable: true })
  password: string;
  @Column('text',{name:"token",nullable:true})
  token: string;
  @Column('date',{name:"createAt",nullable:true})
  createAt:Date;
  @Column('date',{name:"update",nullable:true})
  updateAt:Date;
  @Column('integer',{name:"createby",nullable:true})
  createBy:number;
  @Column('integer',{name:"updateBy",nullable:true})
  updatedBy: number;
  @Column('boolean',{name:"active",nullable:true})
  isActive:boolean
}
