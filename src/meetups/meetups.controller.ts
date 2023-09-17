import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from 'src/shared-models/users.model';

import { MeetupQueryValueType } from './constants/sorts';
import { SignUserToMeetupDto } from './dto/sign-user-to-meetup.dto';
import { AddTagDto } from './dto/add-tag.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { MeetupsService } from './meetups.service';

@Controller()
export class MeetupsController {
	constructor(private readonly meetupsService: MeetupsService) {}

	@MessagePattern('/meetups/getAll')
	async getAll(
		@Payload('name') name: string,
		@Payload('take') take: number,
		@Payload('skip') skip: number,
		@Payload('sort_by') sortBy: MeetupQueryValueType,
	) {
		return await this.meetupsService.getAllMeetups(name, take, skip, sortBy);
	}

	@MessagePattern('/meetups/getById')
	async getById(@Payload('id', new ParseIntPipe()) id: number) {
		return await this.meetupsService.getMeetupById(id);
	}

	@MessagePattern('/meetups/create')
	async create(@Payload() dto: CreateMeetupDto) {
		return await this.meetupsService.createMeetup(dto);
	}

	@MessagePattern('/meetups/updateById')
	async updateById(@Payload('id', new ParseIntPipe()) id: number, @Payload('dto') dto: UpdateMeetupDto) {
		return await this.meetupsService.updateMeetupById(id, dto);
	}

	@MessagePattern('/meetups/deleteById')
	async deleteById(@Payload('id', new ParseIntPipe()) id: number) {
		await this.meetupsService.deleteMeetupById(id);
	}

	@MessagePattern('/meetups/addTag')
	async addTag(@Payload() dto: AddTagDto) {
		return await this.meetupsService.addTag(dto);
	}

	@MessagePattern('/meetups/sign')
	async sign(@Payload('user') user: User, @Payload('dto') dto: SignUserToMeetupDto) {
		return await this.meetupsService.signUserToMeetup(dto, user);
	}
}
