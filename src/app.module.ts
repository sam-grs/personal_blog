import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './post/entities/publication.entity';
import { PublishingModule } from './post/publication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '217684',
      database: 'db_blogpessoal',
      entities: [Publication],
      // sincronizacao o typeorm se atualizar um valor aqui, atualiza no BD
      synchronize: true,
    }),
    PublishingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
