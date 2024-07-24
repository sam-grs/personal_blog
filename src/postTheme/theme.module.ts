import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { ThemeService } from './services/theme.service';
import { ThemeController } from './controllers/theme.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeEntity])],
  providers: [ThemeService],
  controllers: [ThemeController],
  exports: [TypeOrmModule],
})
export class ThemeModule {}
