import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm'
import {User} from "../../user/entities/user.entity";
import {Transaction} from "../../transaction/transaction/entities/transaction.entity";

@Entity()
export class Category
{
    @PrimaryGeneratedColumn({name: 'categoryId'})
    id: number;
    @Column()
    title: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.categories, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(() => Transaction, (transactions) => transactions.user, {
        onDelete: 'CASCADE'
    })
    transactions: Transaction[]
}
