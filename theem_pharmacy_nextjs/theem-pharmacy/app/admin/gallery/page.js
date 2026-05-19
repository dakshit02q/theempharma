'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';

const defaultItem = {
    title: '',
    caption: '',
    image: '',
    order: 0,
    isActive: true,
};

function ItemRow({ item, onEdit, onDelete }) {
    return (
        <tr>
            <td className="px-4 py-3 text-sm text-gray-900 font-medium">{item.title}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{item.order}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{item.isActive ? 'Active' : 'Inactive'}</td>
            <td className="px-4 py-3 text-right">
                <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800 mr-3">
                    <i className="fas fa-edit"></i>
                </button>
                <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-800">
                    <i className="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    );
}

export default function AdminGalleryPage() {
    const [activeTab, setActiveTab] = useState('carousel');
    const [carousel, setCarousel] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState(defaultItem);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    async function fetchData() {
        try {
            setErrorMessage('');
            const [carouselData, photosData] = await Promise.all([
                apiClient.adminGetGalleryCarouselItems(),
                apiClient.adminGetGalleryPhotos(),
            ]);
            setCarousel(Array.isArray(carouselData) ? carouselData : []);
            setPhotos(Array.isArray(photosData) ? photosData : []);
        } catch (error) {
            setErrorMessage(error.message || 'Failed to load gallery data.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function openCreate() {
        setEditingItem(null);
        setFormData(defaultItem);
        setShowModal(true);
    }

    function openEdit(item) {
        setEditingItem(item);
        setFormData({
            title: item.title || '',
            caption: item.caption || '',
            image: item.image || '',
            order: item.order || 0,
            isActive: item.isActive !== false,
        });
        setShowModal(true);
    }

    async function uploadImage(file) {
        if (!file) {
            return;
        }

        setIsUploading(true);
        setErrorMessage('');
        try {
            const uploaded = await apiClient.adminUploadFile(file, {
                folderKind: 'gallery',
                type: 'image',
                preferredName: formData.title || `${activeTab}-item`,
            });
            setFormData((prev) => ({ ...prev, image: uploaded.filePath }));
        } catch (error) {
            setErrorMessage(error.message || 'Failed to upload image.');
        } finally {
            setIsUploading(false);
        }
    }

    async function submitForm(event) {
        event.preventDefault();
        setIsSaving(true);
        setErrorMessage('');

        const payload = {
            ...formData,
            title: formData.title.trim(),
            caption: formData.caption.trim(),
            image: formData.image.trim(),
            order: Number.parseInt(String(formData.order), 10) || 0,
        };

        try {
            if (activeTab === 'carousel') {
                if (editingItem) {
                    await apiClient.adminUpdateGalleryCarouselItem(editingItem.id, payload);
                } else {
                    await apiClient.adminCreateGalleryCarouselItem(payload);
                }
            } else if (editingItem) {
                await apiClient.adminUpdateGalleryPhoto(editingItem.id, payload);
            } else {
                await apiClient.adminCreateGalleryPhoto(payload);
            }

            await fetchData();
            setShowModal(false);
        } catch (error) {
            setErrorMessage(error.message || 'Failed to save item.');
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Delete this gallery item?')) {
            return;
        }

        try {
            setErrorMessage('');
            if (activeTab === 'carousel') {
                await apiClient.adminDeleteGalleryCarouselItem(id);
            } else {
                await apiClient.adminDeleteGalleryPhoto(id);
            }
            await fetchData();
        } catch (error) {
            setErrorMessage(error.message || 'Failed to delete item.');
        }
    }

    const currentItems = activeTab === 'carousel' ? carousel : photos;

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Gallery Management</h1>
                    <button onClick={openCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        <i className="fas fa-plus mr-2"></i>
                        Add {activeTab === 'carousel' ? 'Carousel' : 'Photo'} Item
                    </button>
                </div>

                <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
                    <button
                        onClick={() => setActiveTab('carousel')}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'carousel' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                    >
                        Carousel ({carousel.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('photos')}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'photos' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                    >
                        All Photos ({photos.length})
                    </button>
                </div>

                {errorMessage ? (
                    <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
                ) : null}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((item) => (
                                <ItemRow key={item.id} item={item} onEdit={openEdit} onDelete={handleDelete} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{editingItem ? 'Edit Item' : 'Add Item'}</h2>
                        <form onSubmit={submitForm} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                                <textarea
                                    rows={3}
                                    value={formData.caption}
                                    onChange={(event) => setFormData({ ...formData, caption: event.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp,image/gif"
                                        onChange={(event) => uploadImage(event.target.files?.[0])}
                                        className="w-full text-sm"
                                    />
                                    {isUploading ? <p className="text-xs text-blue-600 mt-1">Uploading...</p> : null}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Path *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.image}
                                        onChange={(event) => setFormData({ ...formData, image: event.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(event) => setFormData({ ...formData, order: event.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <label className="inline-flex items-center gap-2 text-sm text-gray-700 pt-7">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(event) => setFormData({ ...formData, isActive: event.target.checked })}
                                    />
                                    Active item
                                </label>
                            </div>

                            {formData.image ? (
                                <Image
                                    src={formData.image}
                                    alt="Preview"
                                    width={176}
                                    height={112}
                                    className="h-28 w-44 object-cover rounded-lg border border-gray-200"
                                />
                            ) : null}

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600" disabled={isSaving}>
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" disabled={isSaving || isUploading}>
                                    {isSaving ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </AdminLayout>
    );
}
