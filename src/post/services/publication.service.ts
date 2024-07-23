import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Publication } from '../entities/publication.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
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

  async findById(id: number): Promise<Publication> {
    let post = await this.publishingRepository.findOne({
      where: { id },
    });

    if (!post)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return post;
  }

  async findByTitle(title: string): Promise<Publication[]> {
    // ILike = like do BD
    return await this.publishingRepository.find({
      where: { title: ILike(`%${title}%`) }, // ?
    });
  }

  async create(post: Publication): Promise<Publication> {
    return await this.publishingRepository.save(post);
  }

  async update(post: Publication): Promise<Publication> {
    let publication = await this.findById(post.id);

    if (!publication || !post.id) {
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    }
    return await this.publishingRepository.save(post);
  }

  async delete(id: number): Promise<DeleteResult> {
    let post = await this.findById(id);
    if (!post)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    return await this.publishingRepository.delete(id);
  }
}
