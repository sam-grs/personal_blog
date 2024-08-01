import { JwtService } from '@nestjs/jwt'
import { UserService } from './../../user/services/user.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Bcrypt } from '../bcrypt/bcrypt'
import { UserLogin } from '../entities/user-login.entity'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const findUser = await this.userService.findByUser(username)
        console.log('FIND', findUser)
        if (!findUser) throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.comparePassword(password, findUser.password)
        console.log('matchPassword', matchPassword)
        if (findUser && matchPassword) {
            const { password, ...response } = findUser
            return response
        }
        return null
    }

    async login(userLogin: UserLogin) {
        const payload = { sub: userLogin.user }
        const findUser = await this.userService.findByUser(userLogin.user)

        return {
            id: findUser.id,
            name: findUser.name,
            user: userLogin.user,
            password: '',
            photo: findUser.photo,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
}
