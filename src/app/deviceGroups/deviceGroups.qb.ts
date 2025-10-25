import { BadRequestException, Injectable } from "@nestjs/common";
import { KnexCommonBuilder } from "../commons/knexCommon.qb";
import { DeviceGroupEntity } from "./model/deviceGroup.entity";
import { getAverageStatisticsByDurationRtn } from "./model/deviceGroups.vo";

  
@Injectable()
export class DeviceGroupsQb extends KnexCommonBuilder {

    /** 단일값 조회 쿼리. 항상 값이 있음을 기대하므로, 조회 결과가 없다면 공통 처리 부분에서 err던짐 */
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
  
    /** 중복 사용 되는 순수쿼리 부분. 밖에서 끌어 쓸 이유가 없다. protected */
    protected async getDeviceGroupIdBySerialNumberQuery(serialNumber: string):Promise<DeviceGroupEntity | undefined> {
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

    //obj 쓰는 이유: 변수 셋 이상부터는 순서 헷갈리면 기대값과 역전된 결과가 나옴(특히 날짜)
    async getAverageStatisticsByDuration (prm: {deviceGroupId: number, from: Date, to: Date}):Promise<getAverageStatisticsByDurationRtn> {
        //const from = this.toMySQLDateString(prm.from);
        //const to = this.toMySQLDateString(prm.to)

        const result = await this.useKnexRawWithType<getAverageStatisticsByDurationRtn>(`
            SELECT
                AVG(temperature) AS averageTemperature,
                MAX(temperature) AS maxTemperature,
                MIN(temperature) AS minTemperature,
                (
                    -83144.72 / 8.314472 /
                    LOG(
                    AVG(
                        EXP(-83144.72 / (8.314472 * (temperature + 273.15)))
                    )
                    ) - 273.15
                ) AS mkt
                FROM temperature.temperaturelog
                WHERE deviceGroupid = :deviceGroupId
            AND registeredAt BETWEEN :from AND :to;    
        `, prm);
        return this.checkSingleResult<getAverageStatisticsByDurationRtn>(result);
    }
}
