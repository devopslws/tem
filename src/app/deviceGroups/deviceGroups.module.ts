import { Module } from '@nestjs/common';
import { DeviceGroupsService } from './deviceGroups.service';
import { DeviceGroupsController } from './deviceGroups.controller';
import { DeviceGroupsQb } from './deviceGroups.qb';

@Module({
  controllers: [DeviceGroupsController],
  providers: [DeviceGroupsService, DeviceGroupsQb],
  exports: [DeviceGroupsQb]
})
export class DeviceGroupsModule {}
