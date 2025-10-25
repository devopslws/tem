"deviceId"
import { ApiProperty } from "@nestjs/swagger";
import { DeviceGroupEntity } from "../../deviceGroups/model/deviceGroup.entity"

export class RegisterOneResDto {
    @ApiProperty({
        description: '등록된 장비의 고유 ID',
        example: 1,
    })
    deviceId: number;
    
    @ApiProperty({
        description: '장비 일련번호',
        example: 'A1A123456A',
    })
    serialNumber: string;

    @ApiProperty({
        description: '장비 그룹 상세정보',
        example: {
            deviceGroupId: '1',
            serialNumber: 'A1',
            createdAt: '2025-10-24 08:00:00.000'
        },
    })
    deviceGroup: DeviceGroupEntity;
    
    @ApiProperty({
        description: '장비 등록 일자',
        example: '2025-10-24 08:00:00.000',
    })
    createdAt: Date;
}