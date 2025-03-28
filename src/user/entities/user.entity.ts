import { Entity, PrimaryGeneratedColumn, Column, } from 'typeorm';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  @Column("text",{ name:'firstname' ,nullable: true })
  firstname: string;
  @Column("text",{ name:'lastname' ,nullable: true })
  lastname: string;
  @Column( "text",{name:"password" ,nullable: true })
  password: string
  @Column('text',{name:"confirmPassword",nullable:true}) 
  confirmPassword: string;
  @Column("text" ,{ name:'email',nullable: true })
  email: string;
  @Column('text',{name:"role",nullable:true})
  role: string;
  @Column('text',{name:"telephone",nullable:true})
  telephone: number;
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
  @Column('integer',{name:"saltround",nullable:true})
  saltround:number
}
  