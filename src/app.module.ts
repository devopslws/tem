import { Module } from '@nestjs/common';
import { DeviceGroupsModule } from './app/device-groups/device-groups.module';
import { DevicesModule } from './app/devices/devices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from './configAndGlobalModules/knexModule';

//환경 변수를 비동기 시점에 외부에서 받아오면 여기를 수정
const runtimeEnv = () => {
  return {
    DB_CLIENT: 'mysql2',
    DB_HOST: '127.0.0.1',
    DB_PORT: '3306',
    DB_USER: 'root',
    DB_PW: 'temp00!',
    DB_NAME: 'temperature'
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true, load: [runtimeEnv]}), 
    KnexModule,
    DeviceGroupsModule,
    DevicesModule, 
  ],
  
  providers: [ConfigService],
})
export class AppModule {}
