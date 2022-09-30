import * as Sentry from '@sentry/react';

export const logError = (error: unknown, additionalData: undefined | any = undefined) => {
  Sentry.captureException(error, (ctx) => {
    ctx.setExtras({
      ...additionalData
    });

    return ctx;
  });
};
