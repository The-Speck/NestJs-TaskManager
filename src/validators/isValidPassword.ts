import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

const HAS_LETTER_REGEX = /[A-Za-z]/;
const HAS_LOWERCASE_REGEX = /[a-z]/;
const HAS_UPPERCASE_REGEX = /[A-Z]/;
const HAS_NUMBER_REGEX = /[0-9]/;
const HAS_SPECIAL_REGEX = /[.@$!%*?&]/;

export interface IPasswordOptions {
  needsLowerCase?: boolean;
  needsUpperCase?: boolean;
  needsNumber?: boolean;
  needsSpecial?: boolean;
  minLength?: number;
  maxLength?: number;
}

export const isValidPasswordNeeds = (
  value: string,
  {
    needsLowerCase,
    needsUpperCase,
    needsNumber,
    needsSpecial,
    minLength,
    maxLength,
  }: IPasswordOptions,
): boolean => {
  if (!HAS_LETTER_REGEX.test(value)) {
    return false;
  }

  if (value.length < minLength) {
    return false;
  }

  if (value.length > maxLength) {
    return false;
  }

  if (needsLowerCase && !HAS_LOWERCASE_REGEX.test(value)) {
    return false;
  }

  if (needsUpperCase && !HAS_UPPERCASE_REGEX.test(value)) {
    return false;
  }

  if (needsNumber && !HAS_NUMBER_REGEX.test(value)) {
    return false;
  }

  if (needsSpecial && !HAS_SPECIAL_REGEX.test(value)) {
    return false;
  }

  return true;
};

const defaultPasswordOptions: IPasswordOptions = {
  needsLowerCase: true,
  needsUpperCase: true,
  needsSpecial: true,
  needsNumber: true,
  minLength: 6,
  maxLength: 32,
};

export function IsValidPassword(
  passwordOptions: IPasswordOptions = {},
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isValidPassword',
      target: object.constructor,
      constraints: [passwordOptions],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPasswordOptions] = args.constraints;
          return (
            typeof value === 'string' &&
            isValidPasswordNeeds(value, {
              ...defaultPasswordOptions,
              ...relatedPasswordOptions,
            })
          );
        },
      },
    });
  };
}
