import { promises as fs } from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

const FOLDER_BY_KIND = {
    approval: 'approvals',
    gallery: 'gallery',
    'institute-cell': 'institute-cells',
    admissions: 'admissions',
};

const MAX_FILE_SIZE_BYTES = {
    pdf: 10 * 1024 * 1024,
    image: 8 * 1024 * 1024,
};

const MIME_BY_KIND = {
    pdf: new Set(['application/pdf']),
    image: new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
};

const EXT_BY_MIME = {
    'application/pdf': '.pdf',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
};

function sanitizeName(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 64) || 'file';
}

export function getUploadValidation(type) {
    if (!MIME_BY_KIND[type]) {
        return null;
    }

    return {
        maxSize: MAX_FILE_SIZE_BYTES[type],
        mimeSet: MIME_BY_KIND[type],
    };
}

export async function storeUploadedFile({ file, folderKind, type, preferredName }) {
    const validation = getUploadValidation(type);
    if (!validation) {
        throw new Error('Unsupported upload type');
    }

    if (!file) {
        throw new Error('No file uploaded');
    }

    const mimeType = String(file.type || '').toLowerCase();
    if (!validation.mimeSet.has(mimeType)) {
        throw new Error('Invalid file type');
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    if (fileBuffer.byteLength === 0) {
        throw new Error('Uploaded file is empty');
    }

    if (fileBuffer.byteLength > validation.maxSize) {
        throw new Error('File exceeds size limit');
    }

    const folder = FOLDER_BY_KIND[folderKind] || 'misc';
    const folderPath = path.join(UPLOADS_DIR, folder);
    await fs.mkdir(folderPath, { recursive: true });

    const extension = EXT_BY_MIME[mimeType] || path.extname(file.name || '') || '';
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).slice(2, 9);
    const baseName = sanitizeName(preferredName || file.name || type);
    const fileName = `${baseName}-${timestamp}-${randomSuffix}${extension}`;

    const absolutePath = path.join(folderPath, fileName);
    await fs.writeFile(absolutePath, fileBuffer);

    return `/uploads/${folder}/${fileName}`;
}

export async function deletePublicFile(relativePath) {
    if (!relativePath || typeof relativePath !== 'string') {
        return;
    }

    if (!relativePath.startsWith('/uploads/')) {
        return;
    }

    const normalizedPath = path.normalize(relativePath).replace(/^([.][.][/\\])+/, '');
    const absolutePath = path.join(PUBLIC_DIR, normalizedPath);

    if (!absolutePath.startsWith(PUBLIC_DIR)) {
        return;
    }

    try {
        await fs.unlink(absolutePath);
    } catch {
        // Ignore missing files and continue.
    }
}
