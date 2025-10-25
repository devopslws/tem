import { validateDto } from '../commons/unitTestValidator';

import { BadRequestException } from '@nestjs/common';
import { CreateDeviceGroupReqDto } from './model/createDeviceGroup.req.dto';
import { GetAverageStatisticsByDurationReqDto } from './model/getAverageStatisticsByDuration.req.dto';

describe('deviceGroups/registerDeviceGroup', () => {
  it('equal] 그룹 코드 2~12자 이내', async () => {
    const dto = { deviceGroupSerial: 'A1' };
    await expect(validateDto(dto, CreateDeviceGroupReqDto)).resolves.toEqual(dto);
  });
  it('reject] 그룹 코드 2자 이하', async () => {
    const dto = { deviceGroupSerial: 'A' };
    await expect(validateDto(dto, CreateDeviceGroupReqDto)).rejects.toBeInstanceOf(BadRequestException);
  });
  it('reject] 그룹 코드 12자 초과', async () => {
    const dto = { deviceGroupSerial: 'A1234567890123456' };
    await expect(validateDto(dto, CreateDeviceGroupReqDto)).rejects.toBeInstanceOf(BadRequestException);
  });
});

describe('deviceGroups/getAverageStatisticsByDuration', () => {
  let correctValue = { 
    deviceGroupSerial: 'A1', 
    from: new Date('2025-10-24 08:00:00'),
    to: new Date('2025-10-24 08:00:00'), 
  };
  
  it('reject] 장비코드값 잘못 들어옴', async () => {
    let inCorr = Object.assign({}, correctValue)
    inCorr.deviceGroupSerial = 'FFFE00010003FFFE00010003FFFE00010003FFFE0001000';
    const dto = inCorr 
    await expect(validateDto(dto, GetAverageStatisticsByDurationReqDto)).rejects.toBeInstanceOf(BadRequestException);
  });
  it('reject] from이 to보다 늦게 들어옴', async () => {
    let inCorr = Object.assign({}, correctValue)
    inCorr.from = (new Date('2025-11-23 08:00:00'))
    const dto = inCorr;
    await expect(validateDto(dto, GetAverageStatisticsByDurationReqDto)).rejects.toBeInstanceOf(BadRequestException);
  });
  it('reject] 잘못된 날짜 서식', async () => {
    let inCorr = Object.assign({}, correctValue)
    inCorr.from = (new Date('2025-19-23 08:00:00'))
    const dto = inCorr;
    await expect(validateDto(dto, GetAverageStatisticsByDurationReqDto)).rejects.toBeInstanceOf(BadRequestException);
  });
  it('equal] 모두 올바른 값', async () => {
    const dto = correctValue;
    await expect(validateDto(dto, GetAverageStatisticsByDurationReqDto)).resolves.toEqual(dto);
  });

});
