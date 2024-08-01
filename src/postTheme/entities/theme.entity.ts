import { Transform, TransformFnParams } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PublicationEntity } from '../../post/entities/publication.entity'

@Entity({ name: 'tb_themes' })
export class ThemeEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    about: string

    @OneToMany(() => PublicationEntity, (post) => post.theme)
    post: PublicationEntity[]
}
