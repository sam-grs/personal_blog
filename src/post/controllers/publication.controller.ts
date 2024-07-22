import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
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
}
