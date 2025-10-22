import type { Knex as KnexType } from 'knex';

export async function up(knex: KnexType): Promise<void> {
    await knex.schema.createTable('deviceGroup', (table) => {
        table.comment('장비 그룹 관리');
        table.increments('deviceGroupId').primary().comment('deviceGroup PK');
        table.string('serialNumber', 10).notNullable().comment('그룹 코드'); //여기도 인덱싱
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).comment('생성 시간');

        table.index('serialNumber', 'idx_deviceGroup_serialNumber');
    });
    console.log('✅ Table "deviceGroup" created');

    if (!await knex.schema.hasTable('device')) {
        await knex.schema.createTable('device', (table) => {
        table.increments('deviceId').primary().comment('device PK');
        table.string('serialNumber', 20).notNullable().comment('시리얼 번호');
        table.integer('deviceGroupId').unsigned().notNullable().comment('deviceGroup FK');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).comment('생성 시간');

        table.index('serialNumber', 'idx_device_serialNumber');
        table.foreign('deviceGroupId').references('deviceGroup.deviceGroupId');
        });
    }
    console.log('✅ Table "device" created');
    
    if (!await knex.schema.hasTable('temperatureLog')) {
        await knex.schema.createTable('temperatureLog', (table) => {
        table.increments('id').primary().comment('로그 ID');
        table.integer('deviceId', 20).unsigned().notNullable().comment('device FK');
        table.smallint('temperature').notNullable().comment('수집된 기온');
        table.timestamp('registeredAt').notNullable().defaultTo(knex.fn.now()).comment('등록 시간');

        table.foreign('deviceId').references('device.deviceId');
        table.index(['deviceId', 'registeredAt'], 'idx_temp_device_registered');
        });
    }
    console.log('✅ Table "temperatureLog" created');
}

export async function down(knex: KnexType): Promise<void> {
  //롤백은 당연 역순으로
  await knex.schema.dropTableIfExists('temperatureLog');
  console.log('✅ Table "temperatureLog" dropped');
  await knex.schema.dropTableIfExists('device');
  console.log('✅ Table "device" dropped');
  await knex.schema.dropTableIfExists('deviceGroup');
  console.log('✅ Table "deviceGroup" dropped');
}
