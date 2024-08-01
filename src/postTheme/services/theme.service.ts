import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ThemeEntity } from '../entities/theme.entity'
import { DeleteResult, ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ThemeService {
    constructor(
        @InjectRepository(ThemeEntity)
        private themeRepository: Repository<ThemeEntity>,
    ) {}

    async findAll(): Promise<ThemeEntity[]> {
        return await this.themeRepository.find({
            relations: { post: true },
        })
    }

    async findById(id: number): Promise<ThemeEntity> {
        let theme = await this.themeRepository.findOne({
            where: { id },
            relations: { post: true },
        })

        if (!theme) throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)

        return theme
    }

    async findByDescription(about: string): Promise<ThemeEntity[]> {
        return await this.themeRepository.find({
            where: { about: ILike(`%${about}%`) },
            // criando relação com postagem
            relations: { post: true },
        })
    }

    async create(theme: ThemeEntity): Promise<ThemeEntity> {
        return await this.themeRepository.save(theme)
    }

    async update(theme: ThemeEntity): Promise<ThemeEntity> {
        let findTheme = await this.findById(theme.id)

        if (!findTheme || !theme.id) throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)
        return await this.themeRepository.save(theme)
    }

    async delete(id: number): Promise<DeleteResult> {
        let theme = await this.findById(id)
        if (!theme) throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)
        return await this.themeRepository.delete(id)
    }
}
