import { IsNotEmpty, MaxLength } from 'class-validator';

export class ContentTheme {
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;
}
