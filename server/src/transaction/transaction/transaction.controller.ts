import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {AuthorGuard} from "../../guard/auther.guard";

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @UseGuards(JwtAuthGuard, AuthorGuard)
  @UsePipes(new ValidationPipe)
  @Get(':types/:id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AuthorGuard)
  @UsePipes(new ValidationPipe)
  @Patch(':types/:id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard, AuthorGuard)
  @UsePipes(new ValidationPipe)
  @Delete(':types/:id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }

  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  findAllByType(@Req() req, @Param('type') type:string){
    return this.transactionService.findAllByType(+req.user.id, type)



  }

}
