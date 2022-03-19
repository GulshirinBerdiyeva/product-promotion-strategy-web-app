import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN,
  YOUNG_ADULT,
  MIDDLE_AGED_ADULT,
  OLD_AGED_ADULT,
}

registerEnumType(UserRole, { name: 'UserRole' });
