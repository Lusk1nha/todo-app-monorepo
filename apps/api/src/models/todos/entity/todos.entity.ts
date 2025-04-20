import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '@prisma/client';
import { IsBoolean, IsDate, IsNumber, IsUUID } from 'class-validator';

export class TodoEntity implements Todo {
  constructor(todo: Todo) {
    this.uid = todo.uid;
    this.title = todo.title;
    this.content = todo.content;

    this.completed = todo.completed;
    this.position = todo.position;

    this.userId = todo.userId;

    this.createdAt = todo.createdAt;
    this.updatedAt = todo.updatedAt;
  }

  @ApiProperty()
  @IsUUID('4')
  uid: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  content: string | null;

  @ApiProperty()
  @IsBoolean()
  completed: boolean;

  @ApiProperty()
  @IsNumber()
  position: number;

  @ApiProperty()
  @IsUUID('4')
  userId: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
