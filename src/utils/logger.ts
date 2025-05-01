import './loggers';
import { loggers } from 'winston';

const defaultLogger = loggers.get('DefaultLogger');

export { defaultLogger };