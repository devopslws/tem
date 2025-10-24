import { validateDto } from '../commons/unitTestValidator';

import { BadRequestException } from '@nestjs/common';
import { RegisterOneReqDto } from './model/registerOne.req.dto';
import { InsertTemperatureValueReqDto } from './model/insertTemperatureValue.req.dto';
import { GetAverageTemperatureByDurationReqDto } from './model/getAverageTemperatureByDuration.req.dto';

describe('device/registerOne', () => {
  it('장비 8~2자 이내. 그룹 코드 정상', async () => {
    const dto = { serialNumber: 'A1A1212356', deviceGroupSerial: 'A1' };
    await expect(validateDto(dto, RegisterOneReqDto)).resolves.toEqual(dto);
  });
  it('장비 일련번호가 8자 이하.', async () => {
    const dto = { serialNumber: 'A1A12', deviceGroupSerial: 'A1' };
    await expect(validateDto(dto, RegisterOneReqDto)).rejects.toBeInstanceOf(BadRequestException);
  });
  it('장비 그룹번호가 2~12자 아님.', async () => {
    const dto = { serialNumber: 'A1A1212356', deviceGroupSerial: 'A' };
    await expect(validateDto(dto, RegisterOneReqDto)).rejects.toBeInstanceOf(BadRequestException);
  });
});

describe('device/insertTemperatureValue', () => {
  let correctValue = { temperatures: 'FFFE00010003FFFE00010003FFFE00010003FFFE00010003', sereaiNumber: 'A1A1212356'
      ,registeredAt: new Date('2025-10-24 08:00:00'), interval: 60
     };
  
  it('온도가 4의 배수가 아님.', async () => {
    let inCorr = Object.assign({}, correctValue)
    inCorr.temperatures = 'FFFE00010003FFFE00010003FFFE00010003FFFE0001000';
    const dto = inCorr 
    await expect(validateDto(dto, InsertTemperatureValueReqDto)).rejects.toBeInstanceOf(BadRequestException);
  });
  it('온도가 16진수를 벗어남.', async () => {
    let inCorr = Object.assign({}, correctValue)
    inCorr.temperatures = 'FFFE00010003FFFE00010003FFFE00010003FFFE0001000G';
    const dto = inCorr 
    await expect(validateDto(dto, InsertTemperatureValueReqDto)).rejects.toBeInstanceOf(BadRequestException);
  });
  it('장비 8~2자 이내. 그룹 코드 정상', async () => {
    const dto = Object.assign({}, correctValue);
    await expect(validateDto(dto, InsertTemperatureValueReqDto)).resolves.toEqual(dto);
  });
});

describe('device/getAverageTemperature', () => {
  it('장비 8~2자 이내. 그룹 코드 정상', async () => {
    const dto = { deviceSerial: 'A1A1212356', from: new Date('2025-10-24 08:00:00'), to:new Date('2025-10-24 08:00:00') };
    await expect(validateDto(dto, GetAverageTemperatureByDurationReqDto)).resolves.toEqual(dto);
  });
});
