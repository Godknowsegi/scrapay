import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book as books } from '@prisma/client';
import { Book } from '../entities/book.entity';
import { IsString } from 'class-validator';
@ObjectType()
export class BookResponse {
  @Field(() => Boolean)
  status: boolean;

  @Field(() => String)
  message: string;

  @Field(() => [Book])
  data: Book | Book[];
}
