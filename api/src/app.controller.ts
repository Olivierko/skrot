import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async root(): Promise<string> {
    return ':-)';
  }
}