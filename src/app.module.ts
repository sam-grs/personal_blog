import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublicationEntity } from './post/entities/publication.entity'
import { PublishingModule } from './post/publication.module'
import { ThemeModule } from './postTheme/theme.module'
import { ThemeEntity } from './postTheme/entities/theme.entity'
import { AuthModule } from './auth/auth.module'
import { UserEntity } from './user/entities/user.entity'
import { UserModule } from './user/user.module'

// onde fica implementado o módulo raiz da aplicação
// se não for chamado as classes aqui não seram criadas no banco
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '217684',
            database: 'db_personal_blog',
            entities: [PublicationEntity, ThemeEntity, UserEntity],
            // sincronizacao do typeorm se atualizar um valor aqui é atualizado no BD
            synchronize: true,
            // mostra a instrução SQl gerada pelo o typeORM
            // logging: true,
            bigNumberStrings: true,
        }),
        PublishingModule,
        ThemeModule,
        AuthModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
