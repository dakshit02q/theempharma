"use client";

function normalizeDocumentUrl(value) {
    const raw = String(value || '').trim();
    if (!raw) {
        return '';
    }

    if (raw.startsWith('/')) {
        return raw;
    }

    if (raw.startsWith('http://') || raw.startsWith('https://')) {
        try {
            const parsed = new URL(raw);

            const localHosts = new Set(['localhost', '127.0.0.1', '::1']);

            // Normalize localhost absolute URLs to relative paths so they always resolve on current origin.
            if (localHosts.has(parsed.hostname)) {
                return `${parsed.pathname}${parsed.search}${parsed.hash}`;
            }

            return raw;
        } catch {
            return raw;
        }
    }

    return `/${raw}`;
}

export default function PdfViewer({ src, title, heightClass = 'h-[70vh]' }) {
    const normalizedSrc = normalizeDocumentUrl(src);

    function buildEmbeddedSrc(urlStr) {
        if (!urlStr) return '';

        // Use a consistent way to append PDF parameters that works identically on server and client.
        // This avoids hydration mismatches caused by 'new URL(src, window.location.href)'.
        const [base, fragment] = urlStr.split('#');
        const params = new URLSearchParams(fragment || '');

        params.set('toolbar', '1');
        params.set('navpanes', '0');
        params.set('view', 'FitH');

        return `${base}#${params.toString()}`;
    }

    const embeddedSrc = buildEmbeddedSrc(normalizedSrc);

    if (!normalizedSrc) {
        return null;
    }

    return (
        <div className="mt-4 space-y-3">
            <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <embed
                    src={embeddedSrc}
                    type="application/pdf"
                    className={`${heightClass} w-full`}
                />
                <object
                    data={embeddedSrc}
                    type="application/pdf"
                    className={`${heightClass} w-full hidden`}
                >
                    <iframe
                        src={embeddedSrc}
                        title={title || 'PDF Document'}
                        className={`${heightClass} w-full`}
                    />
                </object>
            </div>

            <div className="flex flex-wrap gap-3">
                <a
                    href={normalizedSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-lg border border-[var(--brand-primary-soft)] bg-[var(--brand-primary-soft)] px-3 py-2 text-sm font-bold text-[var(--brand-primary)] hover:brightness-95 transition-all"
                >
                    <i className="fas fa-file-pdf mr-2"></i>
                    Open Full Document
                </a>
                <a
                    href={normalizedSrc}
                    download
                    className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                    <i className="fas fa-download mr-2"></i>
                    Download PDF
                </a>
            </div>
        </div>
    );
}