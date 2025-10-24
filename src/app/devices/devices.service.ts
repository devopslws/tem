import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DevicesQb } from './devices.qb';
import { DeviceGroupsQb } from '../device-groups/device-groups.qb';
import { RegisterOneReqDto } from './model/registerOne.req.dto';
import { RegisterOneResDto } from './model/registerOne.res.dto';
import { InsertTemperatureValueReqDto } from './model/insertTemperatureValue.req.dto';
import * as mathCommon from '../commons/mathCommon';
import { DeviceLogsEntity } from './model/deviceLogs.entity';
import { GetAverageTemperatureByDurationResDto } from './model/getAverageTemperatureByDuration.res.dto';
import { GetAverageTemperatureByDurationReqDto } from './model/getAverageTemperatureByDuration.req.dto';

@Injectable()
export class DevicesService {
  constructor(
    private readonly devicesQb: DevicesQb,
    private readonly deviceGroupsQb: DeviceGroupsQb,
  ) {}

  /** 장비 등록 */
  async registerOne(registerOneReqDto: RegisterOneReqDto) {
    let registerOneResDto = new RegisterOneResDto();

    if (!await this.deviceGroupsQb.checkIsExistBySerialNumber(registerOneReqDto.deviceGroupSerial)) {
      throw new BadRequestException(`${registerOneReqDto.deviceGroupSerial}는 없는 그룹S/N 입니다`);
    } else {
      const result = await this.devicesQb.registerOne(registerOneReqDto.serialNumber);
      if (result.length == 0) {
        throw new BadRequestException('이미 등록된 S/N입니다');
      }
      registerOneResDto.deviceGroup = await this.deviceGroupsQb.getDeviceGroupRowBySerialNumber(registerOneReqDto.deviceGroupSerial);
      Object.assign(registerOneResDto, await this.devicesQb.getDeviceRowBySerialNumber(registerOneReqDto.serialNumber))
    }
    
    return registerOneResDto;
  }

  /** 등록 장비에 온도 데이터 받아서 multiInsert */
  async insertTemperatureValue(insertTemperatureValueReqDto: InsertTemperatureValueReqDto): Promise<null> {
    const serialNumber = insertTemperatureValueReqDto.sereaiNumber;
    const registeredAt = insertTemperatureValueReqDto.registeredAt;
    const interval = insertTemperatureValueReqDto.interval;
    let bulkDao = new Array<DeviceLogsEntity>();
    const smallIntArr: number[] = mathCommon.hexToSignedInt16(insertTemperatureValueReqDto.temperatures);
    smallIntArr.forEach((element, idx) => {
      const row = new DeviceLogsEntity();
      row.deviceId = serialNumber;
      row.temperature = element;
      row.registeredAt = new Date(registeredAt.getTime() + (interval*(idx) * 1000));
      bulkDao.push(row)
    });
    await this.devicesQb.insertTemperatureValue(bulkDao);
    //누락이 아닌 의도적인 null 반환임을 알기 위해 return null을 추가 시키자(문서의 res타입에 data가 없음)
    return null;
  }

  /** 통계 정보 조회 */
  async getAverageTemperature(reqDto: GetAverageTemperatureByDurationReqDto): Promise<GetAverageTemperatureByDurationResDto> {
    //음.. 예외처리를 거쳐서 오기는 하는데 이러면 예측이 널뛰는 문제가 있으니 예외 처리는 가급적 service로 옮겨 예측 가능성을
    //올려주자
    let result = new GetAverageTemperatureByDurationResDto();
    const row = await this.devicesQb.getDeviceRowBySerialNumber(reqDto.deviceSerial)
    if (row) {
      result.id = row.deviceId
      result.serialNumber = reqDto.deviceSerial;
      result.averageTemperature = await this.devicesQb.getAverageTemperature({
        deviceId: row.deviceId,
        from: reqDto.from,
        to: reqDto.to
      });
      return result
    } else {
      throw new BadRequestException(`일치하는 deviceS/N이 없습니다`);
    }
  }

}
