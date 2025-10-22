import { Test, TestingModule } from '@nestjs/testing';
import { DeviceGroupsService } from './device-groups.service';

describe('DeviceGroupsService', () => {
  let service: DeviceGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceGroupsService],
    }).compile();

    service = module.get<DeviceGroupsService>(DeviceGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
