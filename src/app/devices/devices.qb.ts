import { BadRequestException, Injectable } from '@nestjs/common';
import { KnexCommonBuilder } from '../commons/knexCommon.qb';
import { DeviceEntity } from './model/device.entity';
import { DeviceLogsEntity } from './model/deviceLogs.entity';

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

  async insertTemperatureBulkValue(bulkDao: DeviceLogsEntity[]) {
    //중복 입력을 방지할 수 있을까? 어디서 어디 까지를 중복으로 봐야 할까? 장비코드 + 시간?
    return `This action returns all devices`;
  }

  async getAverageTemperature(deviceCode: string) {
    return `This action returns a #${deviceCode} device`;
  }

}
