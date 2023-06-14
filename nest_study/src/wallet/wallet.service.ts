import { Injectable } from '@nestjs/common';
import { Account, IWallet, User } from "interface";

@Injectable()
export class WalletService {
    private readonly accounts: Account[] = []
    private readonly users: User[] = []
    private accountIndex: number = 0

    createAccount(): Account{
        const privateKey = `0x00000000000000000000000000000000000000000000000000000000000000` + this.accountIndex.toString()
        const publicKey = `0x00000000000000000000000000000000000000000000000000000000000000` + this.accountIndex.toString()
        const account = `0x0000000000000000000000000000000000000000` + this.accountIndex.toString()

        const sampleAccount: Account = {
            privateKey,
            publicKey,
            account
        }

        this.accounts.push(sampleAccount)
        this.accountIndex++

        return sampleAccount
    }

    findAccount(user: User): IWallet {
        console.log(user)
        return this.accounts
    }
}
