import { Module } from '@nestjs/common';
import { DeviceGroupsService } from './device-groups.service';
import { DeviceGroupsController } from './device-groups.controller';

@Module({
  controllers: [DeviceGroupsController],
  providers: [DeviceGroupsService],
})
export class DeviceGroupsModule {}
