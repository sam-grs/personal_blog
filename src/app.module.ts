import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublicationEntity } from './post/entities/publication.entity'
import { PublishingModule } from './post/publication.module'
import { ThemeModule } from './postTheme/theme.module'
import { ThemeEntity } from './postTheme/entities/theme.entity'
import { AuthModule } from './auth/auth.module'
import { UserEntity } from './user/entities/user.entity'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { ProdService } from './data/services/prod.service'

// onde fica implementado o módulo raiz da aplicação
// se não for chamado as classes aqui não seram criadas no banco
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useClass: ProdService,
            imports: [ConfigModule],
        }),
        PublishingModule,
        ThemeModule,
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
