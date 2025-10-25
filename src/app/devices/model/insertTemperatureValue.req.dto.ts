import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches, IsDateString, IsInt, Min, IsDate, IsNotEmpty } from 'class-validator';

export class InsertTemperatureValueReqDto {
    @ApiProperty({
        description: 'HEX 온도 데이터. 4의 배수자리로 입력 필수',
        example: 'FFFE00010003FFFE00010003FFFE00010003FFFE00010003',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?:[0-9A-Fa-f]{4})+$/, {
    message: 'temperatures 필드는 4의 배수자리 HEX 단위의 유효한 문자열이어야 합니다.',
    })
    temperatures: string;

    @ApiProperty({
        description: '장비 일련번호 (serialNumber)',
        example: 'A1A123456A',
    })
    @IsString()
    @IsNotEmpty()
    sereaiNumber: string;

    @ApiProperty({
        description:
        '첫 번째 온도 측정 시간 yyyy-mm-dd hh:mm:ss',
        example: '2025-10-24 08:00:00',
    })
    @IsDate({ message: 'registeredAt은 yyyy-mm-dd hh:mm:ss형식의 날짜 범위 이어야 합니다.' })
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    registeredAt: Date;

    @ApiProperty({
        description: '각 온도값 간의 측정 간격 (초 단위)',
        example: 60,
        minimum: 1,
    })
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    interval: number;
}
