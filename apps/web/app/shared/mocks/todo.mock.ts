import { BaseMockup } from "@todo-app/mockup/mockup";
import { TodoEntity } from "../entities/todo.entity";
import { UID } from "../../../entities/uid/uid";
import { faker } from "@faker-js/faker";

export class TodoMockup extends BaseMockup<TodoEntity> {
  protected generateOne(): TodoEntity {
    let uid = new UID();

    let title = faker.lorem.sentence(3);
    let content = faker.lorem.paragraph(3);

    let completed = faker.datatype.boolean();
    let position = faker.number.int({ min: 0, max: 100 });

    let userId = new UID().value;

    let createdAt = this.randomDateWithinDays();
    let updatedAt = this.randomDateWithinDays({
      refDate: createdAt,
    });

    const todo = {
      uid: uid.value,
      title,
      content,
      completed,
      position,
      userId,
      createdAt,
      updatedAt,
    };

    return new TodoEntity(todo);
  }
}
