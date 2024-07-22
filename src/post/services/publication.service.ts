import { Injectable } from '@nestjs/common';
import { Publication } from '../entities/publication.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PublishingService {
  constructor(
    @InjectRepository(Publication)
    private publishingRepository: Repository<Publication>,
  ) {}

  async findAll(): Promise<Publication[]> {
    return await this.publishingRepository.find();
  }
}
