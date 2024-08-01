import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import { Bcrypt } from '../../auth/bcrypt/bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private bcrypt: Bcrypt,
    ) {}

    async findByUser(user: string): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne({
            where: {
                user: user,
            },
        })
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            relations: {
                post: true,
            },
        })
    }

    async findById(id: number): Promise<UserEntity> {
        let user = await this.userRepository.findOne({
            where: {
                id,
            },
            relations: {
                post: true,
            },
        })

        if (!user) throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        return user
    }

    async create(user: UserEntity): Promise<UserEntity> {
        let findUser = await this.findByUser(user.user)

        if (!findUser) {
            user.password = await this.bcrypt.encryptPassword(user.password)
            return await this.userRepository.save(user)
        }

        throw new HttpException('O Usuário ja existe!', HttpStatus.BAD_REQUEST)
    }

    async update(user: UserEntity): Promise<UserEntity> {
        let updateUser: UserEntity = await this.findById(user.id)
        let findUser = await this.findByUser(user.user)

        if (!updateUser) throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        // isso faz sentido no update?
        if (findUser && findUser.id !== user.id)
            throw new HttpException('Email do Usuário já Cadastrado!', HttpStatus.BAD_REQUEST)

        user.password = await this.bcrypt.encryptPassword(user.password)
        return await this.userRepository.save(user)
    }
}
