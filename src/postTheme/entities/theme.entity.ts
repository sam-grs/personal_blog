import { Transform, TransformFnParams } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PublicationEntity } from '../../post/entities/publication.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'tb_themes' })
export class ThemeEntity {
    @PrimaryGeneratedColumn({ type: process.env.NODE_ENV === 'test' ? 'integer' : 'bigint' })
    @ApiProperty()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    about: string

    @ApiProperty()
    @OneToMany(() => PublicationEntity, (post) => post.theme)
    post: PublicationEntity[]
}
