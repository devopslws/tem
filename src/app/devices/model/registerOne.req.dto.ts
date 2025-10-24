import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class RegisterOneReqDto {
    @ApiProperty({
        description: '장비 일련번호 (8~20자)',
        example: 'A1A123456A',
        minLength: 8,
        maxLength: 20,
    })
    @IsString()
    @Length(8, 20)
    serialNumber: string;

    @ApiProperty({
        description: '장비 그룹 일련번호 (2~12자)',
        example: 'A1',
        minLength: 2,
        maxLength: 12,
    })
    @IsString()
    @Length(2, 12)
    deviceGroupSerial: string;
}