import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { TypeOrmModule } from '@nestjs/typeorm'

describe('Testes dos módulos de usuário e auth (e2e)', () => {
    let token: any
    let userId: any
    let app: INestApplication

    beforeAll(async () => {
        process.env.NODE_ENV = 'test'
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite', // não precisa rodar o backend no sqlite
                    database: ':memory:',
                    entities: [__dirname + './../src/**/entities/*.entity.ts'],
                    synchronize: true,
                    // se tiver alguma informação na tabela ele dropa para não dá erro nos testes
                    dropSchema: true,
                }),
                AppModule,
            ],
        }).compile()

        app = moduleFixture.createNestApplication()
        // habilita o validator
        app.useGlobalPipes(new ValidationPipe())
        await app.init()
    })

    // finaliza quando a aplicação terminar
    afterAll(async () => {
        await app.close()
    })

    it('Cadastrar um usuário', async () => {
        const response = await request(app.getHttpServer())
            .post('/usuarios/cadastrar')
            .send({
                name: 'Samira',
                user: 'admin@gmail.com',
                password: '12345678',
                photo: '-',
            })
            .expect(201)
        userId = response.body.id
    })

    it('Não deve Cadastrar um usuário já cadastrado', async () => {
        await request(app.getHttpServer())
            .post('/usuarios/cadastrar')
            .send({
                name: 'Samira',
                user: 'admin@gmail.com',
                password: '12345678',
                photo: '-',
            })
            .expect(400)
    })

    it('Deve autenticar o usuário', async () => {
        const response = await request(app.getHttpServer())
            .post('/usuarios/logar')
            .send({
                user: 'admin@gmail.com',
                password: '12345678',
            })
            .expect(200)
        token = response.body.token
    })

    it('Listar todos os usuários', async () => {
        return request(app.getHttpServer()).get('/usuarios/all').set('Authorization', `${token}`).send({}).expect(200)
    })

    it('Atualizar um usuário', async () => {
        return request(app.getHttpServer())
            .put('/usuarios/atualizar')
            .set('Authorization', `${token}`)
            .send({
                id: userId,
                name: 'Nome atualizado',
                user: 'atualizado@gmail.com',
                password: 'rootroot',
                foto: '-',
            })
            .expect(200)
            .then((response) => expect('Nome atualizado').toEqual(response.body.name))
    })

    it('Listar o usuário pelo o id', async () => {
        return request(app.getHttpServer())
            .get(`/usuarios/${userId}`)
            .set('Authorization', `${token}`)
            .send({})
            .expect(200)
    })
})
