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
import { PublishingService } from '../services/publication.service';
import { Publication } from '../entities/publication.entity';

@Controller('/postagens')
export class PublishingController {
  constructor(private readonly publishingService: PublishingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Publication[]> {
    return this.publishingService.findAll();
  }

  // para pegar o id, precisa associar o id através do Param
  // ParseIntPipe - o que é?
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Publication> {
    return this.publishingService.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByTitle(@Param('titulo') title: string): Promise<Publication[]> {
    return this.publishingService.findByTitle(title);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() post: Publication): Promise<Publication> {
    return this.publishingService.create(post);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() post: Publication): Promise<Publication> {
    return this.publishingService.update(post);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.publishingService.delete(id);
  }
}
