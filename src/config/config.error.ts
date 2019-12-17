import TemplateError from '../exceptions/TemplateError';

export default class ConfigError extends TemplateError {
  constructor(message: string) {
    super(message);
  }
}
