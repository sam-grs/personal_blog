import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

// Aqui é onde define o endpoint home
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}
