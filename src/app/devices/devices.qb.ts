import { BadRequestException, Injectable } from '@nestjs/common';
import { KnexCommonBuilder } from '../commons/knexCommon.qb';
import { DeviceEntity } from './model/device.entity';
import { DeviceLogsEntity } from './model/deviceLogs.entity';
import { getAverageTemperatureRtn } from './devices.vo';

@Injectable()
export class DevicesQb extends KnexCommonBuilder{

  async getDeviceRowBySerialNumber(serialNumber: string):Promise<DeviceEntity> {
      const result = await this.knex<DeviceEntity>('device')
        .where('serialNumber', serialNumber).first();
      const checkedValue = this.checkSingleResult<DeviceEntity>(result, 'serialNumber');
      return checkedValue;
  }

  async checkIsExistBySerialNumber(serialNumber: string):Promise<boolean> {
      const result = await this.knex<DeviceEntity>('device')
        .where('serialNumber', serialNumber).first();
      return this.checkIsExist<DeviceEntity>(result);
  }

  async registerOne(serialNumber: string, deviceGroupId: number) {
    const result = await this.knex<DeviceEntity>('device').insert({
          'serialNumber': serialNumber,
          'deviceGroupId': deviceGroupId
      })
      .onConflict('serialNumber')
      .ignore();
      
      return result
  }

  /** TODO: 엄밀히 말하면 실패 case 나와도 continue 하도록 만들어서 안정성을 올려야 하지만
   * 그러면 또 배치로그 관리 까지 너무 커진다. 이번 과제 영역을 넘어서기 때문에 여기까지
   */
  async insertTemperatureValue(bulkDao: DeviceLogsEntity[] | DeviceLogsEntity) {
    //중복의 기준: deviceId + 동일 '측정'시간
    const result = await this.knex<DeviceLogsEntity>('temperatureLog').insert(bulkDao)
    .onConflict(['registeredAt', 'deviceId'])
    .ignore();
    return result;
  }

  async getAverageTemperature(prm: {deviceId: number, from: Date, to:Date}):Promise<number> {
    const result = await this.knex<DeviceLogsEntity, getAverageTemperatureRtn>('temperatureLog')
      .avg({ avgTemperature: 'temperature' })
      .where('deviceId', prm.deviceId)
      .andWhereBetween('registeredAt',[prm.from, prm.to])
      .first();
    //값을 검사하면 any 타입이 number로 치환 된다
    return this.checkSingleResult<number>(result?.avgTemperature, 'avgTemperature');
  }

}
