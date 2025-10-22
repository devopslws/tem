import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesQb } from './devices.qb';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService, DevicesQb],
})
export class DevicesModule {}
