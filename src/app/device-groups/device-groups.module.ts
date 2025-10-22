import { Module } from '@nestjs/common';
import { DeviceGroupsService } from './device-groups.service';
import { DeviceGroupsController } from './device-groups.controller';
import { DeviceGroupsQb } from './device-groups.qb';

@Module({
  controllers: [DeviceGroupsController],
  providers: [DeviceGroupsService, DeviceGroupsQb],
})
export class DeviceGroupsModule {}
