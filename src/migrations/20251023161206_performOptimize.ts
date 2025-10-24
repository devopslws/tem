import type { Knex as KnexType } from 'knex';

export async function up(knex: KnexType) {
  // 1. 컬럼 추가: 파티션 기준이 되는 그룹id, 장비의 측정 시간과 별개로 관리되는 db 입력 시간
  await knex.schema.alterTable('temperatureLog', (table) => {
    table
      .integer('deviceGroupId')
      .unsigned()
      .notNullable()
      .references('deviceGroupId')
      .inTable('deviceGroup')
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now()).comment('DB 입력시간');
  });
  console.log(`✅ add column 'deviceGroupId' at temperatureLog table `);
  // 2. 멀티 인덱싱 변경: 시계열 데이터 특성상 registeredAt이 앞으로 와야 성능에 긍정적으로 기대
  await knex.raw(`
    ALTER TABLE temperature.temperaturelog DROP FOREIGN KEY temperaturelog_deviceid_foreign;
    `)
  await knex.raw(`
    ALTER TABLE temperature.temperaturelog DROP INDEX idx_temp_device_registered;
  `);
    await knex.raw(`
        ALTER TABLE temperature.temperaturelog
        ADD CONSTRAINT temperaturelog_deviceid_foreign
        FOREIGN KEY (deviceId)
        REFERENCES device(deviceId);
    `)
    
  await knex.raw(`
    CREATE INDEX idx_temp_registered_device ON temperature.temperaturelog (registeredAt, deviceId);
  `);
  console.log(`✅ add column 'idx_temp_device_registered' replaced to 'idx_temp_registered_device' `);
}

export async function down(knex) {
  // 1. 인덱스 롤백
  await knex.raw(`
    ALTER TABLE temperature.temperaturelog DROP FOREIGN KEY temperaturelog_devicegroupid_foreign;
  `);
  await knex.raw(`
    ALTER TABLE temperature.temperaturelog DROP FOREIGN KEY temperaturelog_deviceid_foreign;
  `);
  await knex.raw(`
    ALTER TABLE temperature.temperaturelog DROP INDEX idx_temp_registered_device;
  `);
  
  await knex.raw(`
    CREATE INDEX idx_temp_device_registered
    ON temperature.temperaturelog (deviceId, registeredAt);
  `);
  await knex.raw(`
        ALTER TABLE temperature.temperaturelog
        ADD CONSTRAINT temperaturelog_deviceid_foreign
        FOREIGN KEY (deviceId)
        REFERENCES device(deviceId);
    `)
    
  // 2. 컬럼 삭제
  await knex.schema.alterTable('temperaturelog', (table) => {
    table.dropColumn('deviceGroupId');
    table.dropColumn('createdAt');
  });
}