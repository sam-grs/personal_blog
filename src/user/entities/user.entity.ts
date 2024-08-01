import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PublicationEntity } from '../../post/entities/publication.entity'
import { Transform, TransformFnParams } from 'class-transformer'

@Entity({ name: 'tb_users' })
export class UserEntity {
    // precisa mesmo de public?
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    name: string

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    user: string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    password: string

    @Column({ length: 5000 })
    photo: string

    @OneToMany(() => PublicationEntity, (post) => post.user)
    post: PublicationEntity[]
}
