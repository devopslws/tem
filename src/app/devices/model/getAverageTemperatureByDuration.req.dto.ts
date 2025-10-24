import { IsString, Length, IsDate, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAverageTemperatureByDurationReqDto {
  @IsString()
  @Length(8, 20, { message: 'deviceSerial은 8~20자여야 합니다.' })
  deviceSerial: string;

  @IsDate({ message: 'from은 유효한 날짜 문자열이어야 합니다.' })
  @Transform(({ value }) => new Date(value))
  from: Date;
    
    
  @IsDate({ message: 'to는 유효한 날짜 문자열이어야 합니다.' })
  @Transform(({ value }) => new Date(value))
  to: Date;
}
