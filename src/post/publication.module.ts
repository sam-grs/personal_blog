import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublicationEntity } from './entities/publication.entity'
import { PublishingService } from './services/publication.service'
import { PublishingController } from './controllers/publication.controller'
import { ThemeModule } from '../postTheme/theme.module'
import { ThemeService } from '../postTheme/services/theme.service'

// Reúne entidade, controller e service da aplicação
@Module({
    // traduz a classe para uma entidade na tabela do Banco de Dados
    imports: [TypeOrmModule.forFeature([PublicationEntity]), ThemeModule],
    // Faz relação entre tabelas do BD, onde tema é filho de postagem
    providers: [PublishingService, ThemeService],
    controllers: [PublishingController],
    // deixa ser importado para outros módulos
    exports: [TypeOrmModule],
})
export class PublishingModule {}
