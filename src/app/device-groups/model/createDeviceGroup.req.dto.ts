import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateDeviceGroupReqDto {
    //정해진 서식 없으니 isNull만 검사 하고 끝내자

     @ApiProperty({
        description: '장치 그룹 시리얼 번호',
        minLength: 2,
        maxLength: 12,
        example: 'ABCDEFGH1234'
    })
    @IsString({ message: 'deviceGroupSerial은 문자열이어야 합니다.' })
    @Length(2, 12, { message: 'deviceGroupSerial은 2~12자여야 합니다.' })
    @IsNotEmpty()
    deviceGroupSerial: string;
}
