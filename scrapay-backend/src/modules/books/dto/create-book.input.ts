import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field(() => String, { description: 'The name of the book ' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'The description of the book ' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
