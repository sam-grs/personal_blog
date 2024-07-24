import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ThemeService } from '../services/theme.service';
import { ThemeEntity } from '../entities/theme.entity';

@Controller('/temas')
export class ThemeController {
  constructor(private readonly publishingService: ThemeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<ThemeEntity[]> {
    return this.publishingService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<ThemeEntity> {
    return this.publishingService.findById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findByTitle(@Param('descricao') about: string): Promise<ThemeEntity[]> {
    return this.publishingService.findByDescription(about);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() post: ThemeEntity): Promise<ThemeEntity> {
    return this.publishingService.create(post);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() post: ThemeEntity): Promise<ThemeEntity> {
    return this.publishingService.update(post);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.publishingService.delete(id);
  }
}
