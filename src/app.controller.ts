import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';

@Controller()
export class AppController {

  @Get()
  serveDashboard(@Res() res: any) {
    // Serve dashboard.html
    res.sendFile(join(process.cwd(), 'public', 'dashboard.html'));
  }

  @Get('login')
  serveLogin(@Res() res: any) {
    // Serve login.html
    res.sendFile(join(process.cwd(), 'public', 'login.html'));
  }

  @Get('register')
  serveRegister(@Res() res: any) {
    // Serve register.html
    res.sendFile(join(process.cwd(), 'public', 'register.html'));
  }
}