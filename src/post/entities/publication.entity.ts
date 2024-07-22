import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_posts' })
export class Publication {
  @PrimaryGeneratedColumn() // PK
  id: number;
  @IsNotEmpty()
  @Column({ length: 100, nullable: false }) // nullable é tipo NOT NULL
  title: string;
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  your_text: string;
  @UpdateDateColumn() // coloca a data automática
  date_time: Date;
}
