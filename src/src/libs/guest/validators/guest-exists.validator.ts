import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { GuestService } from '../guest.service';

@ValidatorConstraint({ name: 'AssessmentExists', async: true })
@Injectable()
export class AssessmentExists implements ValidatorConstraintInterface {
  constructor(private readonly service: GuestService) { }

  public async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
    if (!value) {
      return true;
    }
    //   if (!isValidObjectId(value)) {
    //     return false;
    //   }
    return !!(await this.service.findOneOrFail({ uuid: value }));
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Assessment ${validationArguments.value} does not exists!`;
  }
}

export function IsAssessmentExists(column: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [column],
      validator: AssessmentExists,
    });
  };
}
