import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_FILTER } from '@nestjs/core';

import { postgresConfigRegister } from './config/postgres.config';
import { Meetup } from './meetups/models/meetups.model';
import { Role } from './shared-models/roles.model';
import { UserMeetups } from './meetups/models/user-meetups.model';
import { MeetupTags } from './tags/models/meetup-tags';
import { Tag } from './tags/models/tags.model';
import { User } from './shared-models/users.model';
import { HttpExceptionFilter } from './exceptions/rpc.exception.filter';
import { TagsModule } from './tags/tags.module';
import { MeetupsModule } from './meetups/meetups.module';
import { elasticConfigRegister } from './config/elastic.config';
import { CsvModule } from './csv/csv.module';

import type { PostgresConfig } from './config/postgres.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [postgresConfigRegister, elasticConfigRegister],
		}),
		SequelizeModule.forRootAsync({
			inject: [postgresConfigRegister.KEY],
			useFactory: ({ host, port, username, password, database }: PostgresConfig) => ({
				dialect: 'postgres',
				host,
				port,
				username,
				password,
				database,
				models: [User, Role, Meetup, Tag, MeetupTags, UserMeetups],
				autoLoadModels: true,
			}),
		}),
		TagsModule,
		MeetupsModule,
		CsvModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AppModule {}
