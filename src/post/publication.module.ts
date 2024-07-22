import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { PublishingService } from './services/publication.service';
import { PublishingController } from './controllers/publication.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Publication])],
  providers: [PublishingService], // serviço
  controllers: [PublishingController],
  exports: [TypeOrmModule], // deixa disponível para outros módulos
})
export class PublishingModule {}
