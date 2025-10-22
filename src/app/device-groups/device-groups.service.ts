import { BadRequestException, Injectable } from '@nestjs/common';
import { DeviceGroupEntity } from './model/deviceGroup.entity';
import { knexCommonBuilder } from '../commons/knexCommon.qb';

@Injectable()
export class DeviceGroupsService extends knexCommonBuilder {
    /* 
        실무 기준으로 보면 service에는 순수 서버 코드만 두고 쿼리 코드는 repository등의 레이어로 
        분리 하는게 맞지만, 서비스 규모가 작아서 레이어를 나누면 불필요한 레이어 계층이 추가되니 
        생략 하겠습니다.
     */
   /*  constructor(
    @Inject('knex') private readonly knex: Knex,
  ) {} */

    /** 단일값 조회 쿼리. 값이 있을 것을 기대함 */
    async getDeviceGroupIdBySerialNumber(serialNumber: string):Promise<number> {
        const result = await this.getDeviceGroupIdBySerialNumberQuery(serialNumber);
        const checkedValue = this.checkSingleResult<number>(result?.deviceGroupId, 'serialNumber');
        return checkedValue;
    }

    /** 값의 유무를 판별. 있을 수도 없을 수도 있음 */
    async checkIsExistBySerialNumber(serialNumber: string):Promise<boolean> {
        const result =await this.getDeviceGroupIdBySerialNumberQuery(serialNumber);
        return this.checkIsExist(result);
    }

    /** 중복 사용 되는 순수쿼리 부분 */
    async getDeviceGroupIdBySerialNumberQuery(serialNumber: string):Promise<{deviceGroupId:number} | undefined> {
        return await this.knex<DeviceGroupEntity>('deviceGroup')
            .select('deviceGroupId')
            .where('serialNumber', serialNumber)
            .first();
    }

    async registerDeviceGroup(serialNumber: string) {
        //중복 장비 등록 방지를 위해 serialNumber가 있으면 등록을 거절하자
        if (await this.checkIsExistBySerialNumber(serialNumber)) {
            throw new BadRequestException('이미 등록된 S/N입니다');
        }
        const result = await this.knex<DeviceGroupEntity>('deviceGroup').insert({
            'serialNumber': serialNumber
        });
        return result
    }
}
