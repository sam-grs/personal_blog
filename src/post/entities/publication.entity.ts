import { Transform, TransformFnParams } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ThemeEntity } from '../../postTheme/entities/theme.entity'
import { UserEntity } from '../../user/entities/user.entity'

// Criando entidade no banco de dados
@Entity({ name: 'tb_posts' })
export class PublicationEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' }) // PK
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim()) // bloqueia espaço vazio
    @IsNotEmpty()
    @Column({ length: 100, nullable: false }) // nullable é tipo NOT NULL
    title: string

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    your_text: string

    // coloca a data e hora automática Timestamp (data e hora do sistema)
    @UpdateDateColumn()
    date_time: Date

    @ManyToOne(() => ThemeEntity, (theme) => theme.post, {
        onDelete: 'CASCADE',
    })
    theme: ThemeEntity

    @ManyToOne(() => UserEntity, (user) => user.post, {
        onDelete: 'CASCADE',
    })
    user: UserEntity
}
