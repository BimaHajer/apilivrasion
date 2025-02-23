import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('text', { name: 'firstname', nullable: true })
  firstname: string;

  @Column('text', { name: 'lastname', nullable: true })
  lastname: string;

  @Column('text', { name: 'email', nullable: true, unique: true })
  email: string;

  @Column('text', { name: 'telephone', nullable: true })
  telephone: string;

  @Column('text', { name: 'adress', nullable: true })
  adress: string;
  @Column('text',{name:"token",nullable:true})
  token: string;
  @Column('date',{name:"createAt",nullable:true})
  createAt:Date;
  @Column('date',{name:"updateAt",nullable:true})
  updateAt:Date;
  @Column('integer',{name:"createby",nullable:true})
  createBy:number;
  @Column('integer',{name:"updateBy",nullable:true})
  updatedBy: number;
  @Column('boolean',{name:"active",nullable:true})
  isActive:boolean
}
