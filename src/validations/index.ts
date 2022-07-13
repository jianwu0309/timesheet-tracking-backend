import { Schema, ValidationOptions } from '@hapi/joi';
import { badRequest } from '@hapi/boom';

const defaultOptions: ValidationOptions = {
  allowUnknown: false,
  // convert: false,
};

export const validate = <T>(payload: T, schema: Schema, options?: ValidationOptions): any => {
  const joiValidationOptions = options
    ? Object.assign({}, defaultOptions, options)
    : defaultOptions;
  const { error, value } = schema.validate(payload, joiValidationOptions);
  if (error) {
    throw error;
  }
  return value;
};
