import { ApiProperty } from "@nestjs/swagger";
import { LargeNumberLike } from "crypto";

export class GetAverageStatisticsByDurationResDto {
    @ApiProperty({ description: '장치 그룹 ID', example: 123 })
    id: number;

    @ApiProperty({ description: '장치 그룹 시리얼 번호', example: 'DG1234' })
    serialNumber: string;

    @ApiProperty({ description: '평균 온도', example: 22.5 })
    averageTemperature: number;

    @ApiProperty({ description: '최대 온도', example: 28 })
    maxTemperature: number;

    @ApiProperty({ description: '최소 온도', example: 18 })
    minTemperature: number;

    @ApiProperty({ description: 'MKT 값', example: 23.1 })
    mkt: number;
}
