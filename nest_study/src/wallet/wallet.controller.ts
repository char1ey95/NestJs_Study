import { Body, Controller, Get, HostParam, Post, Query } from '@nestjs/common';
import { WalletService } from "./wallet.service";
import { Account, IWallet, User } from "interface";

@Controller('wallet')
export class WalletController {
    constructor(private readonly appService: WalletService) { }

    @Get()
    getWallet(): Account {
        return this.appService.createAccount();
    }

    @Post()
    postWallet(@Query() user: User, @HostParam() a: any): IWallet {
        console.log(a)
        return this.appService.findAccount(user);
    }
}
