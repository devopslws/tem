import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesQb } from './devices.qb';
import { DeviceGroupsModule } from '../deviceGroups/deviceGroups.module';

@Module({
  imports: [DeviceGroupsModule],
  controllers: [DevicesController],
  providers: [DevicesService, DevicesQb],
})
export class DevicesModule {}
