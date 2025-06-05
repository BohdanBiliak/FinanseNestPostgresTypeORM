import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AuthorGuard} from "../guard/auther.guard";

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(createCategoryDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  findAll(@Req() req) {
    return this.categoryService.findAll(+req.user.id);

  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(+id)
  }
  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  @UsePipes(new ValidationPipe)
  update(@Param('id') id: string,
  @Body() updateCategoryDto: UpdateCategoryDto){
    return this.categoryService.update(+id, updateCategoryDto)
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  @UsePipes(new ValidationPipe)
  delete(@Param('id') id: string){
    return this.categoryService.remove(+id)
  }



}
