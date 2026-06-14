const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

function logStep(message) {
    console.log(`\n[SMOKE] ${message}`);
}

async function request(path, options = {}) {
    const url = `${baseUrl}${path}`;
    const res = await fetch(url, options);

    let payload = null;
    try {
        payload = await res.json();
    } catch {
        payload = null;
    }

    return { url, res, payload };
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

async function run() {
    logStep(`BASE_URL=${baseUrl}`);

    logStep('GET /api/navigation should return success + array');
    const nav = await request('/api/navigation');
    assert(nav.res.ok, `Navigation request failed: ${nav.res.status} ${nav.url}`);
    assert(nav.payload?.success === true, 'Navigation payload.success must be true');
    assert(Array.isArray(nav.payload?.data), 'Navigation payload.data must be an array');
    console.log(`[PASS] /api/navigation returned ${nav.payload.data.length} top-level nodes`);

    logStep('GET /api/content/gallery should return success + array');
    const gallery = await request('/api/content/gallery');
    assert(gallery.res.ok, `Gallery content request failed: ${gallery.res.status} ${gallery.url}`);
    assert(gallery.payload?.success === true, 'Gallery content payload.success must be true');
    assert(Array.isArray(gallery.payload?.data), 'Gallery content payload.data must be an array');
    console.log(`[PASS] /api/content/gallery returned ${gallery.payload.data.length} sections`);

    logStep('GET /api/content/about%2Fvision should return success + array');
    const aboutVision = await request(`/api/content/${encodeURIComponent('about/vision')}`);
    assert(aboutVision.res.ok, `About vision request failed: ${aboutVision.res.status} ${aboutVision.url}`);
    assert(aboutVision.payload?.success === true, 'About vision payload.success must be true');
    assert(Array.isArray(aboutVision.payload?.data), 'About vision payload.data must be an array');
    console.log(`[PASS] /api/content/about%2Fvision returned ${aboutVision.payload.data.length} sections`);

    logStep('Admin routes should require auth by default');
    const adminNav = await request('/api/admin/navigation');
    assert(adminNav.res.status === 401, `Expected 401 for /api/admin/navigation, got ${adminNav.res.status}`);
    console.log('[PASS] /api/admin/navigation unauthenticated request returned 401');

    const adminContentCreate = await request('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageSlug: 'gallery', sectionKey: 'smoke', title: 'Smoke' }),
    });
    assert(adminContentCreate.res.status === 401, `Expected 401 for /api/admin/content POST, got ${adminContentCreate.res.status}`);
    console.log('[PASS] /api/admin/content POST unauthenticated request returned 401');

    logStep('Smoke checks completed successfully');
}

run().catch((error) => {
    console.error(`\n[FAIL] ${error.message}`);
    process.exit(1);
});
