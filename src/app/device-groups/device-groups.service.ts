import { BadRequestException, Injectable } from '@nestjs/common';
import { DeviceGroupsQb } from './device-groups.qb';
import { CreateDeviceGroupResDto } from './model/createDeviceGroup.res.dto';
import { GetAverageStatisticsByDurationReqDto } from './model/getAverageStatisticsByDuration.req.dto';
import { GetAverageStatisticsByDurationResDto } from './model/getAverageStatisticsByDuration.res.dto';

@Injectable()
export class DeviceGroupsService {
    constructor (private readonly deviceGroupsQb: DeviceGroupsQb) {}

    /** 신규 장비그룹 등록 */
    async registerDeviceGroup(serialNumber: string): Promise<CreateDeviceGroupResDto> {
        const isExist = await this.deviceGroupsQb.checkIsExistBySerialNumber(serialNumber);
        if (!isExist) {
            await this.deviceGroupsQb.registerDeviceGroup(serialNumber)
            return Object.assign(new CreateDeviceGroupResDto(), await this.deviceGroupsQb.getDeviceGroupRowBySerialNumber(serialNumber));
        } else {
            throw new BadRequestException('이미 등록된 S/N입니다');
        }
    }

    /** 그룹 통계값 조회 */
    async getAverageStatisticsByDuration (reqDto: GetAverageStatisticsByDurationReqDto): Promise<GetAverageStatisticsByDurationResDto> {
        const returnVal = new GetAverageStatisticsByDurationResDto();
        const deviceGroupInfo = await this.deviceGroupsQb.getDeviceGroupRowBySerialNumber(reqDto.deviceGroupSerial);
        const result =  await this.deviceGroupsQb.getAverageStatisticsByDuration({
            deviceGroupId: deviceGroupInfo.deviceGroupId,
            from: reqDto.from,
            to: reqDto.to
        });
        
        returnVal.id = deviceGroupInfo.deviceGroupId;
        returnVal.serialNumber = reqDto.deviceGroupSerial;
        return Object.assign(returnVal, result);
    }
}
