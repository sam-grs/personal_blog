import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ThemeEntity } from '../../postTheme/entities/theme.entity';

@Entity({ name: 'tb_posts' })
export class Publication {
  @PrimaryGeneratedColumn() // PK
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim()) // bloqueia espaço vazio
  @IsNotEmpty()
  @Column({ length: 100, nullable: false }) // nullable é tipo NOT NULL
  title: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  your_text: string;

  @UpdateDateColumn() // coloca a data automática
  date_time: Date;

  // ver esse theme.id
  // o theme.post vem de relations em ThemeService
  @ManyToOne(() => ThemeEntity, (theme) => theme.post, {
    onDelete: 'CASCADE'
  })
  theme: ThemeEntity
}
