import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Publication } from '../entities/publication.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeService } from '../../postTheme/services/theme.service';

@Injectable()
export class PublishingService {
  constructor(
    @InjectRepository(Publication)
    private publishingRepository: Repository<Publication>,
    private themeService: ThemeService
  ) {}

  async findAll(): Promise<Publication[]> {
    return await this.publishingRepository.find({
      relations: {
        theme: true
      }
    });
  }

  async findById(id: number): Promise<Publication> {
    let post = await this.publishingRepository.findOne({
      where: { id },
      relations: { theme: true }
    });

    if (!post)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return post;
  }

  async findByTitle(title: string): Promise<Publication[]> {
    // ILike = like do BD
    return await this.publishingRepository.find({
      where: { title: ILike(`%${title}%`) }, // ?
      relations: { theme: true }
    });
  }

  async create(post: Publication): Promise<Publication> {
    if(post.theme){
      // verifica se tema existe dentro de postagem
      let theme = await this.themeService.findById(post.theme.id)
      if(!theme)
          throw new HttpException('Tema não foi encontrado!', HttpStatus.NOT_FOUND)
    }

    return await this.publishingRepository.save(post);
  }

  async update(post: Publication): Promise<Publication> {
    let publication = await this.findById(post.id);

    if (!publication || !post.id) 
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    if(post.theme){
      await this.themeService.findById(post.theme.id)
      return await this.publishingRepository.save(post);    
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
