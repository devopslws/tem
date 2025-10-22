import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeviceGroupsService } from './device-groups.service';
import { CreateDeviceGroupDto } from './model/create-device.dto';

@Controller('deviceGroups')
export class DeviceGroupsController {
  constructor(private readonly deviceGroupsService: DeviceGroupsService) {}
    @Get('/sayHello')
    sayHello() {
      return 'hello';
    }

    @Post('/registerDeviceGroup')
    registerDeviceGroup(@Body() createDeviceDto: CreateDeviceGroupDto) {
      return this.deviceGroupsService.registerDeviceGroup(createDeviceDto.deviceGroupSerial);
    }
}
