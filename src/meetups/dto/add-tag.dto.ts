import { IsNumber } from 'class-validator';

export class AddTagDto {
	@IsNumber()
	meetupId: number;

	@IsNumber()
	tagId: number;
}
