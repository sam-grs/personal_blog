import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PublicationEntity } from '../entities/publication.entity'
import { DeleteResult, ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ThemeService } from '../../postTheme/services/theme.service'

// Regras de negócio da aplicação, é onde fazemos a validação das requisições
@Injectable()
export class PublishingService {
    constructor(
        // herda os métodos sem precisar instanciar
        @InjectRepository(PublicationEntity)
        private publishingRepository: Repository<PublicationEntity>,
        private themeService: ThemeService,
    ) {}

    async findAll(): Promise<PublicationEntity[]> {
        return await this.publishingRepository.find({
            relations: { theme: true, user: true },
        })
    }

    async findById(id: number): Promise<PublicationEntity> {
        let post = await this.publishingRepository.findOne({
            where: { id },
            relations: { theme: true, user: true },
        })

        if (!post) throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)

        return post
    }

    async findByTitle(title: string): Promise<PublicationEntity[]> {
        // ILike = like do BD
        return await this.publishingRepository.find({
            where: { title: ILike(`%${title}%`) },
            relations: { theme: true, user: true },
        })
    }

    async create(post: PublicationEntity): Promise<PublicationEntity> {
        if (post.theme) {
            let theme = await this.themeService.findById(post.theme.id)
            if (!theme) throw new HttpException('Tema não foi encontrado!', HttpStatus.NOT_FOUND)
        }

        return await this.publishingRepository.save(post)
    }

    async update(post: PublicationEntity): Promise<PublicationEntity> {
        let publication = await this.findById(post.id)

        if (!publication || !post.id) throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)
        if (post.theme) {
            await this.themeService.findById(post.theme.id)
            return await this.publishingRepository.save(post)
        }

        return await this.publishingRepository.save(post)
    }

    async delete(id: number): Promise<DeleteResult> {
        let post = await this.findById(id)
        if (!post) throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND)
        return await this.publishingRepository.delete(id)
    }
}
