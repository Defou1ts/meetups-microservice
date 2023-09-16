import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Meetup } from 'src/meetups/models/meetups.model';

import { MeetupTags } from './meetup-tags';
import { User } from 'src/shared-models/users.model';

interface TagCreationAttrs {
	name: string;
}

@Table({ tableName: 'tag' })
export class Tag extends Model<Tag, TagCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	name: string;

	@BelongsToMany(() => Meetup, () => MeetupTags)
	meetups: User[];
}
