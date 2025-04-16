import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { TodosService } from './todos.service';
import { UserAuthType } from 'src/common/types';
import { CreateTodoDto } from './dto/create.dto';
import { UID } from 'src/common/entities/uid/uid';
import { UIDParam } from 'src/common/entities/uid/uid.decorator';
import { TodoEntity } from './entity/todos.entity';
import { UpdateTodoDto } from './dto/update.dto';
import { checkRowLevelPermission } from 'src/common/auth/auth.utils';

@Controller('todos')
@ApiTags('Todos')
@AllowAuthenticated()
@ApiBearerAuth()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all todos',
    description: 'Retrieves a list of all todos for the authenticated user',
  })
  @ApiOkResponse({
    type: TodoEntity,
    isArray: true,
    description: 'Successfully retrieved list of todos',
  })
  async getTodos(@GetUser() currentUser: UserAuthType) {
    return this.todosService.getUserTodos(new UID(currentUser.sub));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get todo by ID',
    description: 'Retrieves a specific todo by its unique identifier for the authenticated user',
  })
  @ApiOkResponse({
    type: TodoEntity,
    description: 'Successfully retrieved todo',
  })
  async getTodoById(@UIDParam('id') id: UID, @GetUser() currentUser: UserAuthType) {
    const todo = await this.todosService.getTodoById(id);
    checkRowLevelPermission(currentUser, todo.userId);

    return todo;
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new todo',
    description: 'Allows authenticated users to create a new todo',
  })
  @ApiOkResponse({
    type: TodoEntity,
    description: 'Successfully created todo',
  })
  async createTodo(@Body() payload: CreateTodoDto, @GetUser() currentUser: UserAuthType) {
    const userId = new UID(currentUser.sub);
    return this.todosService.createTodo(payload, userId);
  }

  @Post(':id/complete')
  @ApiOperation({
    summary: 'Complete a todo',
    description: 'Allows authenticated users to mark a todo as completed',
  })
  @ApiOkResponse({
    type: TodoEntity,
    description: 'Successfully completed todo',
  })
  async completeTodo(@UIDParam('id') id: UID, @GetUser() currentUser: UserAuthType) {
    const todo = await this.todosService.getTodoById(id);
    checkRowLevelPermission(currentUser, todo.userId);

    return this.todosService.completeTodo(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a todo',
    description: 'Allows authenticated users to update an existing todo',
  })
  @ApiOkResponse({
    type: TodoEntity,
    description: 'Successfully updated todo',
  })
  async updateTodo(
    @UIDParam('id') id: UID,
    @Body() payload: UpdateTodoDto,
    @GetUser() currentUser: UserAuthType,
  ) {
    const todo = await this.todosService.getTodoById(id);
    checkRowLevelPermission(currentUser, todo.userId);

    return this.todosService.updateTodo(id, payload);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a todo',
    description: 'Allows authenticated users to delete an existing todo',
  })
  @ApiOkResponse({
    description: 'Successfully deleted todo',
  })
  async deleteTodo(@UIDParam('id') id: UID, @GetUser() currentUser: UserAuthType) {
    const todo = await this.todosService.getTodoById(id);
    checkRowLevelPermission(currentUser, todo.userId);

    return this.todosService.deleteTodo(id);
  }
}
