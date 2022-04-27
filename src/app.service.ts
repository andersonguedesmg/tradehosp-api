import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getVersion(): unknown {
    return {
      name: 'TradeHosp',
      version: '1.0.0',
    };
  }
}
