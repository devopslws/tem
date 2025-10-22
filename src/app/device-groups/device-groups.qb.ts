import { BadRequestException, Injectable } from "@nestjs/common";
import { KnexCommonBuilder } from "../commons/knexCommon.qb";
import { DeviceGroupEntity } from "./model/deviceGroup.entity";


@Injectable()
export class DeviceGroupsQb extends KnexCommonBuilder {

  /** 단일값 조회 쿼리. 값이 있을 것을 기대함 */
      async getDeviceGroupRowBySerialNumber(serialNumber: string):Promise<DeviceGroupEntity> {
          const result = await this.getDeviceGroupIdBySerialNumberQuery(serialNumber);
          const checkedValue = this.checkSingleResult<DeviceGroupEntity>(result, 'serialNumber');
          return checkedValue;
      }
  
      /** 값의 유무를 판별. 있을 수도 없을 수도 있음 */
      async checkIsExistBySerialNumber(serialNumber: string):Promise<boolean> {
          const result =await this.getDeviceGroupIdBySerialNumberQuery(serialNumber);
          return this.checkIsExist(result);
      }
  
      /** 중복 사용 되는 순수쿼리 부분 */
      async getDeviceGroupIdBySerialNumberQuery(serialNumber: string):Promise<DeviceGroupEntity | undefined> {
          return await this.knex<DeviceGroupEntity>('deviceGroup')
              .where('serialNumber', serialNumber)
              .first();
      }
      /** 신규 장비그룹 등록 */
      async registerDeviceGroup(serialNumber: string): Promise<number[]> {
          /** 
           * onConflict: insert 직전에 serialNumber이미 있는지 확인. 후속 작업은 ignore로 아무것도 안함 
           * bulk값 입력이 아님 + 단순 테이블 구조 이므로 후속 작업을 무시하면 일관성 보장 가능(현재로서는)
          */
          const result = await this.knex<DeviceGroupEntity>('deviceGroup').insert({
              'serialNumber': serialNumber
          })
          .onConflict('serialNumber')
          .ignore();
          
          return result
      }
  
      async getAverageStatisticsByDuration (deviceCode: string) {
          //흠.. 그룹의 크기를 가늠할 수 없다. 만약 3~5개의 장비가 하나의 그룹이라면 파티션을 나누는게 더 불편할지도?
          //총량 100만건'을'조회하는 기능일까? 아니면 쿼리 결과로 평균 100만건'이'조회되는 기능 일까?
          //전자라면 좀 더 상황을 보고 결정해야 하지만 후자라면 아무리 쪼개지더라도 그룹별 파티션을 나누는게 맞다
      }

}
