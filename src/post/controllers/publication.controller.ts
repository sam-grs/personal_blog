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
    UseGuards,
} from '@nestjs/common'
import { PublishingService } from '../services/publication.service'
import { PublicationEntity } from '../entities/publication.entity'
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

// Os métodos do CRUD descritos no Diagrama de Classes
@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller('/postagens')
@ApiBearerAuth()
export class PublishingController {
    constructor(private readonly publishingService: PublishingService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<PublicationEntity[]> {
        return this.publishingService.findAll()
    }

    // para pegar o id, precisa associar o id através do Param
    // ParseIntPipe - o que é?
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<PublicationEntity> {
        return this.publishingService.findById(id)
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitle(@Param('titulo') title: string): Promise<PublicationEntity[]> {
        return this.publishingService.findByTitle(title)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() post: PublicationEntity): Promise<PublicationEntity> {
        return this.publishingService.create(post)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() post: PublicationEntity): Promise<PublicationEntity> {
        return this.publishingService.update(post)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.publishingService.delete(id)
    }
}
