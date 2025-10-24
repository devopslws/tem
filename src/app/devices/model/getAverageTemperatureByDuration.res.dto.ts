import { ApiProperty } from "@nestjs/swagger";

export class GetAverageTemperatureByDurationResDto {
    @ApiProperty({
          description: '장비S/N의 id',
          example: '1',
      })
    id:number;

    @ApiProperty({
      description: '조회시 입력한 8~20자의 등록된 장비S/N',
      example: 'A1A123456A',
    })
    serialNumber: String;

    @ApiProperty({
        description: '집계 온도',
        example: '34',
    })
    averageTemperature: number;
}