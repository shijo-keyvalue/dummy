import {Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ unique: true })
  public phoneNumber: string;

  @Column({ nullable: true })
  public password?: string;

  @Column({ nullable: true , default: "verification-pending" })
  public status?: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
  })
  public updatedAt: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "timestamp",
    nullable: true,
    default: null,
  })
  public deletedAt?: Date = null;

}
