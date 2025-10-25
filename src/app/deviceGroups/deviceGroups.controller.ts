import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DeviceGroupsService } from './deviceGroups.service';
import { CreateDeviceGroupReqDto } from './model/createDeviceGroup.req.dto';
import { CreateDeviceGroupResDto } from './model/createDeviceGroup.res.dto';
import { GetAverageStatisticsByDurationReqDto } from './model/getAverageStatisticsByDuration.req.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetAverageStatisticsByDurationResDto } from './model/getAverageStatisticsByDuration.res.dto';

@Controller('deviceGroups')
export class DeviceGroupsController {
  constructor(private readonly deviceGroupsService: DeviceGroupsService) {}
  /*
    대체로 변수명은 길더라도 이름에서 목적을 담는게 좋다.
    하지만 타입으로 선언된 class명이 충분히 그 목적을 설명하고, 서버 로직이 단순해서 혼동의 여지가 없다면
    차라리 reqDto와 같은 추상적인 변수명이 관리 + 가독성 측면에셔 유리하다고 판단된다.

    복잡한 기능에서만 고유한 이름을 사용
  */
  @Post('/registerDeviceGroup')
  @ApiOperation({ summary: '장치 그룹 등록', description: '새로운 장치 그룹을 등록합니다.' })
  @ApiResponse({ status: 201, description: '장치 그룹 등록 성공', type: CreateDeviceGroupResDto })
  @ApiResponse({ status: 400, description: '유효하지 않은 요청 데이터' })
  async registerDeviceGroup(
    @Body() reqDto: CreateDeviceGroupReqDto
  ): Promise<CreateDeviceGroupResDto> {
    return await this.deviceGroupsService.registerDeviceGroup(reqDto.deviceGroupSerial);
  }

    @Get('/getAverageStatisticsByDuration')
    @ApiOperation({ summary: '장치 그룹 통계 조회', description: '그룹별 지정 기간의 평균, 최대, 최소, mkt값을 조회' })
    @ApiResponse({ status: 201, description: '장치 그룹 등록 성공', type: GetAverageStatisticsByDurationResDto })
    @ApiResponse({ status: 400, description: '유효하지 않은 요청 데이터' })
    async getAverageStatisticsByDuration(@Query() reqDto: GetAverageStatisticsByDurationReqDto):Promise<GetAverageStatisticsByDurationResDto> {
      return await this.deviceGroupsService.getAverageStatisticsByDuration(reqDto);
    }
}


