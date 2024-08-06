import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PublicationEntity } from '../../post/entities/publication.entity'
import { Transform, TransformFnParams } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'tb_users' })
export class UserEntity {
    // precisa mesmo de public?
    @PrimaryGeneratedColumn({ type: process.env.NODE_ENV === 'test' ? 'integer' : 'bigint' })
    @ApiProperty()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty({ example: 'email@email.com' })
    user: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    password: string

    @Column({ length: 5000 })
    @ApiProperty()
    photo: string

    @ApiProperty()
    @OneToMany(() => PublicationEntity, (post) => post.user)
    post: PublicationEntity[]
}
