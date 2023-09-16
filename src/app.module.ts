import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { postgresConfigRegister } from './config/postgres.config';

import type { PostgresConfig } from './config/postgres.config';
import { Meetup } from './meetups/models/meetups.model';
import { Role } from './shared-models/roles.model';
import { UserMeetups } from './meetups/models/user-meetups.model';
import { MeetupTags } from './tags/models/meetup-tags';
import { Tag } from './tags/models/tags.model';
import { User } from './shared-models/users.model';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env`,
			load: [postgresConfigRegister],
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
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
