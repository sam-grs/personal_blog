import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { PublicationEntity } from '../../post/entities/publication.entity'
import { ThemeEntity } from '../../postTheme/entities/theme.entity'
import { UserEntity } from '../../user/entities/user.entity'

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '217684',
            database: 'db_personal_blog',
            entities: [PublicationEntity, ThemeEntity, UserEntity],
            synchronize: true,
        }
    }
}
