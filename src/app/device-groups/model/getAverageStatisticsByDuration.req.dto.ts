import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString, Length } from "class-validator";
import { Transform } from 'class-transformer';

export class GetAverageStatisticsByDurationReqDto {
    @ApiProperty({
        description: '장치 그룹 시리얼 번호',
        minLength: 2,
        maxLength: 12,
        example: 'A1',
    })
    @IsString({ message: 'deviceGroupSerial은 문자열이어야 합니다.' })
    @Length(2, 12, { message: 'deviceGroupSerial은 2~12자여야 합니다.' })
    @IsNotEmpty()
    deviceGroupSerial: string;

    @ApiProperty({
        description: '조회 시작 날짜 YYYY-MM-DD hh:mm:ss',
        example: '2025-10-01 00:00:00',
    })
    @IsDate({ message: 'from은 유효한 날짜 어야 합니다.' })
    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    from: Date;

    @ApiProperty({
        description: '조회 종료 날짜 YYYY-MM-DD hh:mm:ss',
        example: '2025-10-24 00:00:00',
    })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'to는 유효한 날짜 문자열이어야 합니다.' })
    @IsNotEmpty()
    to: Date;
}
