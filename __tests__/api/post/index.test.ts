/**
 * @jest-environment node
 */
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import postHandler from '../../../pages/api/post/index';

describe('/api/post', () => {
    test('rejects unsupported HTTP method', async () => {
        const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({
            method: 'GET' // unsupported HTTP method
        });

        await postHandler(req, res);
        expect(res.statusCode).toBe(405);
    });
});
