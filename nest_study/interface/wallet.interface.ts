import { acccount, privateKey, publicKey, userId, userPassword } from "./wallet";

export interface Account {
    privateKey: privateKey
    publicKey: publicKey
    account: acccount
}

export interface User {
    userId: userId
    userPassword: userPassword
}

export type IWallet = Account[]