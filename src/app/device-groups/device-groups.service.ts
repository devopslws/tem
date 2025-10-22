import { Inject, Injectable } from '@nestjs/common';
import { CreateDeviceGroupDto } from './dto/create-device.dto';
import { Knex } from 'knex';
import { DeviceGroupEntity } from '../entities/deviceGroup.entity';

@Injectable()
export class DeviceGroupsService {
    constructor(
    @Inject('knex') private readonly knex: Knex, // <- 타입 명시 중요
  ) {}

    async registerDeviceGroup(createDeviceDto: CreateDeviceGroupDto) {
        const result = await this.knex<DeviceGroupEntity>('deviceGroup').insert({
            'serialNumber':createDeviceDto.deviceGroupSerial ,
        });
        return result
    }
}
