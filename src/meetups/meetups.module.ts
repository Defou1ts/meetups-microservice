import { Meetup } from './models/meetups.model';
import { MeetupsController } from './meetups.controller';
import { MeetupsService } from './meetups.service';
import { MeetupsRepository } from './meetups.repository';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MeetupTags } from 'src/tags/models/meetup-tags';
import { Tag } from 'src/tags/models/tags.model';
import { TagsModule } from 'src/tags/tags.module';
import { UserMeetups } from './models/user-meetups.model';
import { User } from 'src/shared-models/users.model';

@Module({
	providers: [MeetupsService, MeetupsRepository],
	controllers: [MeetupsController],
	imports: [SequelizeModule.forFeature([Meetup, Tag, MeetupTags, User, UserMeetups]), TagsModule],
})
export class MeetupsModule {}
