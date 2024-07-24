import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Publication } from '../../post/entities/publication.entity';

@Entity({ name: 'tb_themes' })
export class ThemeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  about: string;

  @OneToMany(() => Publication, (post) => post.theme)
  post: Publication[]
}
