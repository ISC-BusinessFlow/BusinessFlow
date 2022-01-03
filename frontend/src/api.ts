import ky from 'ky';

import { toCamelCase, toSnakeCase } from '@/utils/modifyCase';

export const api = ky.extend({
  // TODO: process.env.NODE_ENVによって変える
  prefixUrl: 'http://localhost:3000',
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
