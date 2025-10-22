import { BadRequestException, Injectable } from '@nestjs/common';
import { DeviceGroupsQb } from './device-groups.qb';
import { CreateDeviceGroupResDto } from './model/createDeviceGroup.res.dto';

@Injectable()
export class DeviceGroupsService {
    constructor (private readonly deviceGroupsQb: DeviceGroupsQb) {}

    /** 신규 장비그룹 등록 */
    async registerDeviceGroup(serialNumber: string): Promise<CreateDeviceGroupResDto> {
        const affectRow = await this.deviceGroupsQb.registerDeviceGroup(serialNumber)
        if (affectRow.length == 1) {
            return Object.assign(new CreateDeviceGroupResDto(), await this.deviceGroupsQb.getDeviceGroupRowBySerialNumber(serialNumber));

        } else {
            throw new BadRequestException('이미 등록된 S/N입니다');
        }
    }

    /** 그룹 통계값 조회 */
    async getAverageStatisticsByDuration (deviceCode: string) {
        return await this.deviceGroupsQb.getAverageStatisticsByDuration(deviceCode);
    }
}
