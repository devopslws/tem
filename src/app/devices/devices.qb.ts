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

  async registerOne(serialNumber: string) {
    const result = await this.knex<DeviceEntity>('device').insert({
          'serialNumber': serialNumber
      })
      .onConflict('serialNumber')
      .ignore();
      
      return result
  }

  async insertTemperatureValue(bulkDao: DeviceLogsEntity[] | DeviceLogsEntity) {
    //중복 입력을 방지할 수 있을까? 어디서 어디 까지를 중복으로 봐야 할까? 장비코드 + 시간?
    const result = await this.knex<DeviceLogsEntity>('deviceLog').insert(bulkDao)
    return `This action returns all devices`;
  }

  async getAverageTemperature(prm: {deviceId: number, from: Date, to:Date}):Promise<number> {
    const result = await this.knex<DeviceLogsEntity, getAverageTemperatureRtn>('deviceLog')
      .avg({ avgTemperature: 'temperature' })
      .where('deviceId', prm.deviceId)
      .andWhereBetween('registeredAt',[prm.from, prm.to])
      .first();
    //값을 검사하면 any 타입이 number로 치환 된다
    return this.checkSingleResult<number>(result?.avgTemperature, 'avgTemperature');
  }

}
