import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  YOUNG_ADULTS,
  MIDDLE_AGED_ADULTS,
  OLD_AGED_ADULTS,
}

registerEnumType(UserRole, { name: 'UserRole' });
