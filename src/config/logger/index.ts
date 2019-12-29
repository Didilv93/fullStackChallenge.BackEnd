import * as log4js from 'log4js';

log4js.configure({
  appenders: {
    userLogs: { type: 'file', filename: 'logs/user.log' },
    console: { type: 'console' }
  },
  categories: {
    user: { appenders: ['console', 'userLogs'], level: 'ALL' },
    default: { appenders: ['console', 'userLogs'], level: 'ALL' }
  }
});

export const logger = log4js.getLogger('user');
