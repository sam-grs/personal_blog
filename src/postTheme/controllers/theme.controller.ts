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
import { ThemeService } from '../services/theme.service'
import { ThemeEntity } from '../entities/theme.entity'
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Tema')
@UseGuards(JwtAuthGuard)
@Controller('/temas')
@ApiBearerAuth()
export class ThemeController {
    constructor(private readonly themeService: ThemeService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<ThemeEntity[]> {
        return this.themeService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<ThemeEntity> {
        return this.themeService.findById(id)
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    findByTitle(@Param('descricao') about: string): Promise<ThemeEntity[]> {
        return this.themeService.findByDescription(about)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() post: ThemeEntity): Promise<ThemeEntity> {
        return this.themeService.create(post)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() post: ThemeEntity): Promise<ThemeEntity> {
        return this.themeService.update(post)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.themeService.delete(id)
    }
}
