import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class Bcrypt {
    async encryptPassword(password: string): Promise<string> {
        // é onde coloca os números aleatórios na criptografia
        let jumps: number = 10 // ver se pode trocar o let
        return await bcrypt.hash(password, jumps) // ver no código do rafael
    }

    async comparePassword(passwordEntered: string, passwordBank: string): Promise<boolean> {
        return bcrypt.compare(passwordEntered, passwordBank)
    }
}
