import { Transform, TransformFnParams } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ThemeEntity } from '../../postTheme/entities/theme.entity'
import { UserEntity } from '../../user/entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'

// Criando entidade no banco de dados
@Entity({ name: 'tb_posts' })
export class PublicationEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn({ type: process.env.NODE_ENV === 'test' ? 'integer' : 'bigint' })
    id: number

    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim()) // bloqueia espaço vazio
    @IsNotEmpty()
    @Column({ length: 100, nullable: false }) // nullable é tipo NOT NULL
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    your_text: string

    @ApiProperty()
    // coloca a data e hora automática Timestamp (data e hora do sistema)
    @UpdateDateColumn()
    date_time: Date

    @ApiProperty({ type: () => ThemeEntity })
    @ManyToOne(() => ThemeEntity, (theme) => theme.post, {
        onDelete: 'CASCADE',
    })
    theme: ThemeEntity

    @ApiProperty({ type: () => UserEntity })
    @ManyToOne(() => UserEntity, (user) => user.post, {
        onDelete: 'CASCADE',
    })
    user: UserEntity
}
