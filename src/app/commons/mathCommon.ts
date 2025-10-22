

import { DeviceLogsEntity } from "../devices/model/deviceLogs.entity";

//음.. 이정도 타입 의존성이면 공통 기능이라 볼 수는 없군 정확히 Hex만 분리해서 잘라 보내는 기능으로 바꾸자
export function hexToSignedInt16(hexString: string): number[] {
  const result: number[] = [];

  for (let i = 0; i < hexString.length; i += 4) { 
    const slice = hexString.substring(i, 4);
    let val = parseInt(slice, 16);
    if (val >= 0x8000) val = val - 0x10000;

    
    result.push(val);
  }
  return result;
}