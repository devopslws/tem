import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { RegisterOneReqDto } from './model/registerOne.req.dto';
import { InsertTemperatureValueReqDto } from './model/insertTemperatureValue.req.dto';
import { GetAverageTemperatureByDurationReqDto } from './model/getAverageTemperatureByDuration.req.dto';
import { GetAverageTemperatureByDurationResDto } from './model/getAverageTemperatureByDuration.res.dto';



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
  getAverageTemperature(@Query() reqDto:GetAverageTemperatureByDurationReqDto): Promise<GetAverageTemperatureByDurationResDto> {
    return this.devicesService.getAverageTemperature(reqDto);
  }
}
