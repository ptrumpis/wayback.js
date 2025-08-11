import { Wayback } from '../src/wayback.js';
import assert from 'assert';

global.fetch = fetch;

describe('Wayback class tests', function () {
    let wayback;

    beforeEach(function () {
        global.fetch = function () {};
        wayback = new Wayback();
    });

    afterEach(function () {
        wayback.destroy();
    });

    it('should return archived snapshot if URL is archived', async function () {
        global.fetch = async () => (
            {
            ok: true,
            json: async () => ({
                archived_snapshots: { closest: { url: 'http://example.com/123', timestamp: '20220101' } }
            })
        });

        const result = await wayback.isArchived('http://example.com');
        assert.deepStrictEqual(result, { url: 'http://example.com/123', timestamp: '20220101' });
    });

    it('should return oldest archived snapshot', async function () {
        global.fetch = async () => (
            {
            ok: true,
            json: async () => ({
                archived_snapshots: { closest: { url: 'http://web.archive.org/web/20020120142510/http://example.com:80/', timestamp: '20020120142510' } }
            })
        });

        const result = await wayback.isArchived('http://example.com', { oldestArchive: true });
        assert.deepStrictEqual(result, { url: 'http://web.archive.org/web/20020120142510/http://example.com:80/', timestamp: '20020120142510' });
    });

    it('should return HTTP status 200 if URL is not archived', async function () {
        global.fetch = async () => ({
            ok: true,
            json: async () => ({
                archived_snapshots: null
            }),
            status: 200,
        });

        const result = await wayback.isArchived('http://example.com');
        assert.strictEqual(result, 200);
    });

    it('should save URL and return snapshot', async function () {
        global.fetch = async () => ({
            ok: true,
            status: 301,
            headers: { get: () => 'https://web.archive.org/web/20220101000000/http://example.com' }
        });

        const result = await wayback.saveUrl('http://example.com');
        assert.deepStrictEqual(result, { url: 'https://web.archive.org/web/20220101000000/http://example.com', timestamp: '20220101000000' });
    });

    it('should return HTTP status code if save URL fails', async function () {
        global.fetch = async () => ({
            ok: false,
            status: 404
        });

        const result = await wayback.saveUrl('http://example.com');
        assert.strictEqual(typeof result, 'number');
        assert.strictEqual(result, 404);
    });

    it('should save outdated URL if it is older than maxAgeDays', async function () {
        const outdated = '20220101000000';
        const snapshot = { url: `https://web.archive.org/web/${outdated}/http://example.com`, timestamp: outdated };
        const mockIsArchived = wayback.isArchived = async () => snapshot;

        const timestamp = Wayback.currentTimestamp();
        global.fetch = async () => ({
            ok: true,
            status: 301,
            headers: { get: () => `https://web.archive.org/web/${timestamp}/http://example.com` }
        });

        const result = await wayback.saveOutdatedUrl('http://example.com', 30);
        assert.deepStrictEqual(result, { url: `https://web.archive.org/web/${timestamp}/http://example.com`, timestamp: timestamp });

        wayback.isArchived = mockIsArchived;
    });

    it('should return snapshot if URL is not outdated', async function () {
        const timestamp = Wayback.currentTimestamp();
        const snapshot = { url: `https://web.archive.org/web/${timestamp}/http://example.com`, timestamp: timestamp };
        const mockIsArchived = wayback.isArchived = async () => snapshot;

        const result = await wayback.saveOutdatedUrl('http://example.com', 1);
        assert.deepStrictEqual(result, snapshot);

        wayback.isArchived = mockIsArchived;
    });

    it('should resolve redirect URL correctly', async function () {
        global.fetch = async () => ({
            url: 'http://example.com/redirected'
        });

        const result = await wayback.getFinalRedirectUrl('http://example.com');
        assert.strictEqual(result, 'http://example.com/redirected');
    });

    it('should return original URL if no redirect', async function () {
        global.fetch = async () => ({
            url: 'http://example.com'
        });

        const result = await wayback.getFinalRedirectUrl('http://example.com');
        assert.strictEqual(result, 'http://example.com');
    });
});
