import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import type { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.RMQ,
		options: {
			urls: [
				{
					protocol: 'amqp',
					username: process.env.RABBIT_MQ_USER,
					password: process.env.RABBIT_MQ_PASSWORD,
					hostname: process.env.RABBIT_MQ_HOST,
					port: Number(process.env.RABBIT_MQ_PORT),
				},
				// `amqp://${process.env.RABBIT_MQ_USER}:${process.env.RABBIT_MQ_PASSWORD}@${process.env.RABBIT_MQ_HOST}:${process.env.RABBIT_MQ_PORT}`,
			],
			queue: 'meetups_queue',
			queueOptions: {
				durable: false,
			},
		},
	});

	app.useGlobalPipes(new ValidationPipe());

	await app.listen();
}
void bootstrap();
