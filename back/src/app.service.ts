import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

interface DBConfing {
  host: string
  port: string
}

@Injectable()
export class AppService {
  constructor(private configService: ConfigService){}
  getHello(): string {
    console.log(this.configService.get<DBConfing>('database'))
    console.log(this.configService.get('PORT', { infer: true }))
    return 'Hello World!';
  }
}
