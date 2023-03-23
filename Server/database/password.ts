import bcrypt from "bcrypt"

export async function HashPassword(password: string) {
    return await bcrypt.hash(password, 10)
}

export async function ComparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash)
}