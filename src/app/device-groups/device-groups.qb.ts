import { Inject, Injectable } from '@nestjs/common';
import { CreateDeviceGroupDto } from './model/create-device.dto';
import { Knex } from 'knex';
import { DeviceGroupEntity } from './model/deviceGroup.entity';


//음... 사용 보류 규모에 비해 너무 많은 레이어
@Injectable()
export class DeviceGroupsQb {
    constructor(
    @Inject('knex') private readonly knex: Knex,
  ) {}

    async registerDeviceGroup(createDeviceDto: CreateDeviceGroupDto) {
        const result = await this.knex<DeviceGroupEntity>('deviceGroup').insert({
            'serialNumber':createDeviceDto.deviceGroupSerial ,
        });
        return result
    }
}
