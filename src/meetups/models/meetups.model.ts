import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { MeetupTags } from 'src/tags/models/meetup-tags';
import { Tag } from 'src/tags/models/tags.model';
import { UserMeetups } from './user-meetups.model';
import { User } from 'src/shared-models/users.model';

interface MeetupCreationAttrs {
	name: string;
	description: string;
	location: string;
	date: Date;
}

@Table({ tableName: 'meetups' })
export class Meetup extends Model<Meetup, MeetupCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	name: string;

	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	description: string;

	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	location: string;

	@Column({ type: DataType.DATE, unique: false, allowNull: false })
	date: Date;

	@BelongsToMany(() => Tag, () => MeetupTags)
	tags: Tag[];

	@BelongsToMany(() => User, () => UserMeetups)
	users: User[];
}
