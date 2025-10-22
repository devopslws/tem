import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { RegisterOneReqDto } from './model/registerOne.req.dto';
import { InsertTemperatureValueReqDto } from './model/insertTemperatureValue.req.dto';


@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('/registerOne')
  registerOne(@Body() registerOneReqDto: RegisterOneReqDto) {
    return this.devicesService.registerOne(registerOneReqDto);
  }

  @Post('/insertTemperatureValue')
  insertTemperatureValue(@Body() insertTemperatureValueReqDto: InsertTemperatureValueReqDto): Promise<null> {
    //특이하게 response값이 없다. null이 반환되면 filter에서 data부분을 지우고 내보내도록 추가 하자(message만)
    return this.devicesService.insertTemperatureValue(insertTemperatureValueReqDto);
  }

  @Get('/getAverageTemperature')
  getAverageTemperature(@Param('id') deviceCode: string) {
    //get과 post 모두 object형식으로 통일 시켜주는 커스텀 기능 만들자. 이름은 @ReqDto
    return this.devicesService.getAverageTemperature(deviceCode);
  }
}
