import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MeetupTags } from 'src/tags/models/meetup-tags';
import { Tag } from 'src/tags/models/tags.model';
import { TagsModule } from 'src/tags/tags.module';
import { User } from 'src/shared-models/users.model';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { elasticConfigRegister } from 'src/config/elastic.config';
import { PdfModule } from 'src/pdf/pdf.module';

import { UserMeetups } from './models/user-meetups.model';
import { MeetupsRepository } from './meetups.repository';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { Meetup } from './models/meetups.model';
import { MeetupsSearchService } from './meetups-search.service';

import type { ElasticConfig } from 'src/config/elastic.config';

@Module({
	providers: [MeetupsService, MeetupsRepository, MeetupsSearchService],
	controllers: [MeetupsController],
	imports: [
		PdfModule,
		SequelizeModule.forFeature([Meetup, Tag, MeetupTags, User, UserMeetups]),
		TagsModule,
		ElasticsearchModule.registerAsync({
			useFactory({ firstNodeHost, secondNodeHost, thirdNodeHost, port, username, password }: ElasticConfig) {
				return {
					auth: { username, password },
					nodes: [
						`http://${firstNodeHost}:${port}`,
						`http://${secondNodeHost}:${port}`,
						`http://${thirdNodeHost}:${port}`,
					],
				};
			},
			inject: [elasticConfigRegister.KEY],
		}),
	],
})
export class MeetupsModule {}
