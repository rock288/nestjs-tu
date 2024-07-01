import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublicItems1719842763378 implements MigrationInterface {
  private readonly logger = new Logger(PublicItems1719842763378.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('up');
    await queryRunner.query('UPDATE item SET public = 1');
  }

  public async down(): Promise<void> {
    this.logger.log('down');
  }
}
