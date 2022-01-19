import ky from 'ky';

import { toCamelCase, toSnakeCase } from '@/utils/modifyCase';

const prefixUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_PREFIX_URL_DEV
    : process.env.NEXT_PUBLIC_API_PREFIX_URL;

export const api = ky.extend({
  prefixUrl,
  hooks: {
    beforeRequest: [
      async (_request, options) => {
        if (options.body && typeof options.body === 'string') {
          const body = JSON.parse(options.body);
          return toSnakeCase(body);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        try {
          const body = await response.json();
          return toCamelCase(body);
        } catch (e) {
          return;
        }
      },
    ],
  },
});
