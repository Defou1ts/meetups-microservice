import { IsDateString, IsString } from 'class-validator';

export class CreateMeetupDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	location: string;

	@IsDateString()
	date: Date;
}
