import * as Router from 'koa-router';
import { files } from 'controllers';

const router = new Router({ prefix: '/files' });

router.post('/', files.upload);

export default router;
