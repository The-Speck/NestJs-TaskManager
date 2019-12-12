import TemplateError from '../exceptions/TemplateError';

export default class ConfigError extends TemplateError {
  constructor(m: string) {
    super(m);
  }
}
