import { hexToSignedInt16 } from './mathCommon';

describe('mathCommon', () => {  
  it('equal] 16진수 -> 10진수 변환 확인', async () => {
    expect(hexToSignedInt16('FFFE00010003'))
        .toEqual([-2,1,3]);
  });
});

