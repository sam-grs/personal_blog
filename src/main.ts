import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    // NestFactory - criação de uma nova instância (executa um objeto)
    const app = await NestFactory.create(AppModule)
    process.env.TZ = '-03:00' // hora de brasilia
    // ValidationPipe validacao de dados do objeto
    app.useGlobalPipes(new ValidationPipe())
    // para aceitar req de um servidor diferente do backend, como o frontend
    app.enableCors()
    await app.listen(4000)
}
bootstrap()
