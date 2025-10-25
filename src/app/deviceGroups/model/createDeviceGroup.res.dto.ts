import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceGroupResDto {
  @ApiProperty({
    description: '장치 그룹 ID',
    example: 123,
  })
  deviceGroupId: number;

  @ApiProperty({
    description: '장치 그룹 시리얼 번호',
    example: 'ABCDEFGH1234',
  })
  serialNumber: string;

  @ApiProperty({
    description: '생성 일시',
    example: '2025-10-24T14:30:00Z',
  })
  createdAt: Date;
}
