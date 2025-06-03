import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import {User} from "../../../user/entities/user.entity";
import {Category} from "../../../category/entities/category.entity";

@Entity()
export class Transaction
{
    @PrimaryGeneratedColumn({ name: 'transaction_id' })
    id: number;
    @Column()
    title: string;
    @Column({nullable: true})
    type: string;
    @Column()
    amount: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({name: 'user_id'})
    user: User;
    @ManyToOne(() => Category, (category) => category.transactions)
    @JoinColumn({name: 'category_id'})
    category: Category;
}


