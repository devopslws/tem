"deviceId"
import { DeviceGroupEntity } from "../../device-groups/model/deviceGroup.entity"

export class RegisterOneResDto {
    deviceId: number;
    serialNumber: string;
    deviceGroup: DeviceGroupEntity;
    createdAt: Date;
}