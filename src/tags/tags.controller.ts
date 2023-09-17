import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@Controller()
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@MessagePattern('tags/create')
	async create(@Payload() dto: CreateTagDto) {
		console.log('tags/create', dto);
		return await this.tagsService.createTag(dto);
	}

	@MessagePattern('tags/getAll')
	async getAll() {
		console.log('tags/getAll');
		return await this.tagsService.getAllTags();
	}
}
