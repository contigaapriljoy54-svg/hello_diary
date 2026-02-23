import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';

@Controller()
export class AppController {

  @Get()
  serveDashboard(@Res() res: any) {
    res.sendFile(join(process.cwd(), 'public', 'dashboard.html'));
  }

  @Get('login')
  serveLogin(@Res() res: any) {
    res.sendFile(join(process.cwd(), 'public', 'login.html'));
  }

  @Get('register')
  serveRegister(@Res() res: any) {
    res.sendFile(join(process.cwd(), 'public', 'register.html'));
  }
}