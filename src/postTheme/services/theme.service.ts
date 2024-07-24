import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ThemeEntity } from '../entities/theme.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeEntity)
    private postThemeRepository: Repository<ThemeEntity>,
  ) {}

  async findAll(): Promise<ThemeEntity[]> {
    return await this.postThemeRepository.find();
  }

  async findById(id: number): Promise<ThemeEntity> {
    let theme = await this.postThemeRepository.findOne({
      where: { id },
    });

    if (!theme)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return theme;
  }

  async findByDescription(about: string): Promise<ThemeEntity[]> {
    return await this.postThemeRepository.find({
      where: { about: ILike(`%${about}%`) },
    });
  }

  async create(theme: ThemeEntity): Promise<ThemeEntity> {
    return await this.postThemeRepository.save(theme);
  }

  async update(theme: ThemeEntity): Promise<ThemeEntity> {
    let id = await this.findById(theme.id);

    if (!id || !theme.id) {
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    }
    return await this.postThemeRepository.save(theme);
  }

  async delete(id: number): Promise<DeleteResult> {
    let theme = await this.findById(id);
    if (!theme)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    return await this.postThemeRepository.delete(id);
  }
}
