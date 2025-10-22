
import { UpdateDeviceRegisterDto } from "../devices/dto/update-device-register.dto";
import { DeviceLogsEntity } from "../entities/DeviceLogs.entity";

//음.. 이정도 타입 의존성이면 공통 기능이라 볼 수는 없군 정확히 Hex만 분리해서 잘라 보내는 기능으로 바꾸자
export function hexToSignedInt16(udrg: UpdateDeviceRegisterDto): DeviceLogsEntity[] {
  const result: DeviceLogsEntity[] = [];

  for (let i = 0; i < udrg.temperatures.length; i += 4) { // 2바이트 = 4 hex chars
    const slice = udrg.temperatures.substring(i, 4);
    let val = parseInt(slice, 16);
    if (val >= 0x8000) val = val - 0x10000; // signed 처리

    const row = new DeviceLogsEntity();
    row.deviceId = udrg.sereaiNumber;
    row.temperature = val;
    new Date(udrg.registeredAt.getTime() + (udrg.interval*(i/4) * 1000)) //몫만 보니까 1이라도 0
    result.push(row);
  }
  return result;
}