import * as bcrypt from "bcrypt";

const ENCRYPTION_SALT = 13;

export const getHash = async function hashData(data: string): Promise<any> {
    return await bcrypt.hash(data, ENCRYPTION_SALT);
}