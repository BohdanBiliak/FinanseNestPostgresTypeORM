import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "../../category/entities/category.entity";
import {Repository} from "typeorm";
import {Transaction} from "./entities/transaction.entity";

@Injectable()
export class TransactionService {
  constructor(
      @InjectRepository(Transaction)
      private readonly transactionRepository: Repository<Transaction>,
  ) {
  }
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async findAllByType(id: number, type: string){
          const transaction = await this.transactionRepository.find({
            where: {
              user: {id},
              type
            },
          })
    const total = transaction.reduce((acc, obj) =>acc + obj.amount, 0)

  }
}
