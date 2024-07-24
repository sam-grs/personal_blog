import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { PublishingService } from './services/publication.service';
import { PublishingController } from './controllers/publication.controller';
import { ThemeModule } from '../postTheme/theme.module';
import { ThemeService } from '../postTheme/services/theme.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publication]), ThemeModule],
  providers: [PublishingService, ThemeService], // serviço
  controllers: [PublishingController],
  exports: [TypeOrmModule], // deixa disponível para outros módulos
})
export class PublishingModule {}
