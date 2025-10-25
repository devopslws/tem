import { hexToSignedInt16 } from './mathCommon';

describe('mathCommon', () => {  
  it('16진수 -> 2진수', async () => {
    expect(hexToSignedInt16('FFFE00010003'))
        .toEqual([-2,1,3]);
  });
});

