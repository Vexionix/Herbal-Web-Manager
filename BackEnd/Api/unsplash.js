import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: '75kvQkPoyfaPtW92qFmRXRQvlNWNv0iKzRerzTPznW0',
  fetch: nodeFetch,
});

export default unsplash;