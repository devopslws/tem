import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeviceGroupsService } from './device-groups.service';
import { CreateDeviceGroupReqDto } from './model/createDeviceGroup.req.dto';
import { CreateDeviceGroupResDto } from './model/createDeviceGroup.res.dto';

@Controller('deviceGroups')
export class DeviceGroupsController {
  constructor(private readonly deviceGroupsService: DeviceGroupsService) {}
    @Get('/sayHello')
    sayHello() {
      return 'hello';
    }

    @Post('/registerDeviceGroup')
    async registerDeviceGroup(@Body() createDeviceDto: CreateDeviceGroupReqDto): Promise<CreateDeviceGroupResDto> {
      return await this.deviceGroupsService.registerDeviceGroup(createDeviceDto.deviceGroupSerial);
    }

    @Get('/getAverageStatisticsByDuration')
    async getAverageStatisticsByDuration(@Param('id') deviceCode: string) {
      return await this.deviceGroupsService.getAverageStatisticsByDuration(deviceCode);
    }
}
