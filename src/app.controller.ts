import { Controller, Get, Res } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'
// Aqui é onde define o endpoint home
@Controller()
export class AppController {
    constructor() {}

    @ApiExcludeEndpoint()
    @Get()
    async redirect(@Res() response: any) {
        return response.redirect('/swagger')
    }
}
