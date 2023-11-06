import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book as books } from '@prisma/client';
@ObjectType()
export class Book {
  @Field(() => String)
  id: books['id'];

  @Field(() => String)
  name: books['name'];

  @Field(() => String)
  description: books['description'];

  @Field(() => String)
  created_at: books['created_at'];
}
