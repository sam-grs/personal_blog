import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
    // NestFactory - criação de uma nova instância (executa um objeto)
    const app = await NestFactory.create(AppModule)
    const config = new DocumentBuilder()
        .setTitle('Blog Pessoal')
        .setDescription('Projeto Blog Pessoal')
        .setContact('Samira Grossi', 'https://github.com/sam-grs', 'samira.grossi_oliveira@outlook.com')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/swagger', app, document)

    process.env.TZ = '-03:00' // hora de brasilia
    // ValidationPipe validacao de dados do objeto
    app.useGlobalPipes(new ValidationPipe())
    // para aceitar req de um servidor diferente do backend, como o frontend
    app.enableCors()
    await app.listen(process.env.PORT || 4000)
}
bootstrap()
