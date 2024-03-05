import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Inject(ConfigService)
  private readonly configService:ConfigService
  @Get()
  getHello(){
    return{
      env:process.env,
      aaa:this.configService.get('aaa'),
      bbb:this.configService.get('bbb')
    }
    // return this.appService.getHello();
  }
}
