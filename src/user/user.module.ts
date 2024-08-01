import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'
import { Bcrypt } from '../auth/bcrypt/bcrypt'
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService, Bcrypt],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
