import { IsString, Length, IsDate, IsDateString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsAfterFrom } from '../../../configAndGlobalModules/fromToCheck.decorator';


export class GetAverageTemperatureByDurationReqDto {
  @ApiProperty({
      description: '8~20자의 등록된 장비S/N',
      example: 'A1A123456A',
  })
  @IsString()
  @Length(8, 20, { message: 'deviceSerial은 8~20자여야 합니다.' })
  @IsNotEmpty()
  deviceSerial: string;

  @ApiProperty({
      description: '조회 시작 시간 yyyy-mm-dd hh:mm:ss',
      example: '2025-10-24 08:00:00',
  })
  @IsDate({ message: 'from은 유효한 날짜 문자열이어야 합니다.' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  from: Date;
    
  @ApiProperty({
      description: '조회 종료 시간 yyyy-mm-dd hh:mm:ss',
      example: '2025-10-24 09:00:00',
  })
  @IsDate({ message: 'to는 유효한 날짜 문자열이어야 합니다.' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsAfterFrom('from', 'to는 from보다 같거나 늦은 기간이어야 합니다')
  to: Date;
}
