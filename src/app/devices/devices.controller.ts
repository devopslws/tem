import { Controller, Get, Post, Body,  Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { DevicesService } from './devices.service';
import { RegisterOneReqDto } from './model/registerOne.req.dto';
import { InsertTemperatureValueReqDto } from './model/insertTemperatureValue.req.dto';
import { GetAverageTemperatureByDurationReqDto } from './model/getAverageTemperatureByDuration.req.dto';
import { GetAverageTemperatureByDurationResDto } from './model/getAverageTemperatureByDuration.res.dto';
import { RegisterOneResDto } from './model/registerOne.res.dto';



@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('/registerOne')
  @ApiOperation({ summary: '단일 장치 등록' })
  @ApiResponse({ status: 201, description: '장치 등록 성공', type: RegisterOneResDto })
  @ApiResponse({ status: 400, description: 'badRequest' })
  registerOne(@Body() registerOneReqDto: RegisterOneReqDto):Promise<RegisterOneResDto> {
    return this.devicesService.registerOne(registerOneReqDto);
  }

  @Post('/insertTemperatureValue')
  @ApiOperation({ summary: '온도 데이터 삽입' })
  @ApiResponse({ status: 201, description: '온도 데이터 삽입 완료, 반환값 없음' })
  @ApiResponse({ status: 400, description: 'badRequest' })
  insertTemperatureValue(@Body() insertTemperatureValueReqDto: InsertTemperatureValueReqDto): Promise<null> {
    //특이하게 response값이 없다. null이 반환되면 filter에서 data부분을 지우고 내보내도록 추가 하자(message만)
    return this.devicesService.insertTemperatureValue(insertTemperatureValueReqDto);
  }

  @Get('/getAverageTemperature')
  @ApiOperation({ summary: '장치별 일정 기간 평균 온도 조회' })
  @ApiResponse({ status: 200, description: '평균 온도 조회 결과', type: GetAverageTemperatureByDurationResDto })
  @ApiResponse({ status: 400, description: 'badRequest' })
  getAverageTemperature(@Query() reqDto:GetAverageTemperatureByDurationReqDto): Promise<GetAverageTemperatureByDurationResDto> {
    return this.devicesService.getAverageTemperature(reqDto);
  }
}
