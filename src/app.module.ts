import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './post/entities/publication.entity';
import { PublishingModule } from './post/publication.module';
import { ThemeModule } from './postTheme/theme.module';
import { ThemeEntity } from './postTheme/entities/theme.entity';

// onde fica implementado o módulo raiz da aplicação
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '217684',
      database: 'db_personal_blog',
      entities: [Publication, ThemeEntity],
      // sincronizacao do typeorm se atualizar um valor aqui é atualizado no BD
      synchronize: true,
      // mostra a instrução SQl gerada pelo o typeORM
      logging: true,
    }),
    PublishingModule,
    ThemeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
