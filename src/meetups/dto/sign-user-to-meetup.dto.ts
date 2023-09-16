import { IsNumber } from 'class-validator';

export class SignUserToMeetupDto {
	@IsNumber()
	meetupId: number;
}
