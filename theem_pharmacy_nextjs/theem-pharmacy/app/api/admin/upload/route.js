import { requireAuth } from '@/lib/auth';
import { apiError, apiSuccess, handleApiError } from '@/lib/api/response';
import { storeUploadedFile } from '@/lib/storage/files';

const ALLOWED_FOLDER_KINDS = new Set(['approval', 'gallery', 'institute-cell', 'admissions']);
const ALLOWED_TYPES = new Set(['pdf', 'image']);

export async function POST(request) {
    const authResult = requireAuth(request);
    if (!authResult.success) {
        return apiError(authResult.error, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const folderKind = String(formData.get('folderKind') || '').trim();
        const type = String(formData.get('type') || '').trim();
        const preferredName = String(formData.get('preferredName') || '').trim();

        if (!file || typeof file === 'string') {
            return apiError('Missing file', { status: 400 });
        }

        if (!ALLOWED_FOLDER_KINDS.has(folderKind)) {
            return apiError('Invalid folder kind', { status: 400 });
        }

        if (!ALLOWED_TYPES.has(type)) {
            return apiError('Invalid upload type', { status: 400 });
        }

        const filePath = await storeUploadedFile({
            file,
            folderKind,
            type,
            preferredName,
        });

        return apiSuccess(
            {
                filePath,
                fileName: file.name,
                size: file.size,
                type: file.type,
            },
            {
                status: 201,
                message: 'File uploaded successfully',
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            return apiError(error.message, { status: 400 });
        }

        return handleApiError(error, 'Error uploading file:', 'Failed to upload file');
    }
}
