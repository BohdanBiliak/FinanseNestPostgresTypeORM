
import  {Entity, PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToMany,JoinColumn} from 'typeorm'
import {Category} from "../../category/entities/category.entity";
import {Transaction} from "../../transaction/transaction/entities/transaction.entity";
@Entity()
export class User
 {
     @PrimaryGeneratedColumn()
     id: number;
     @Column()
     email: string;
     @Column()
     password: string;
     @CreateDateColumn()
     createdAt: Date;
     @UpdateDateColumn()
     updatedAt: Date;

     @OneToMany(() => Category, (category) => category.user, {
     onDelete: 'CASCADE'
        })
    categories: Category[]
    @OneToMany(() => Transaction, (transactions) => transactions.user, {
     onDelete: 'CASCADE'
        })
    transactions: Transaction[];
 }
