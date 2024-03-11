import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get('code')
  async sendEmailCode(@Query('address') address) {
    await this.emailService.sendMail({
      to:address,
      subject:'验证码',
      html:`<b>您的验证码是：${Math.floor(Math.random()*1000000)}</b>`
    })
    return '发送成功'
  }
}
