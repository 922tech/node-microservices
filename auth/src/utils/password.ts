import crypto, { scrypt, randomBytes } from "crypto";

export default class Password {
    static hashPassword(password: string) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    static async comparePassword(storedPassword: string,suppliedPassword: string) {
        return Password.hashPassword(suppliedPassword) === storedPassword;
    }
}

const pass = Password.hashPassword('13242');
console.log(pass, Password.comparePassword(pass, '13242'));
