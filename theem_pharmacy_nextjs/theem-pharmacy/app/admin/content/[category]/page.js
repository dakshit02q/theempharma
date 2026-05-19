'use client';

import { useEffect, useState, use } from 'react';
import AdminLayout from '@/components/AdminLayout';
import JsonFormEditor from '@/components/JsonFormEditor';
import { apiClient } from '@/lib/api-client';
import { EDITABLE_PAGES } from '@/lib/content/admin-config';
import { useRouter } from 'next/navigation';

const defaultForm = {
    id: '',
    title: '',
    content: '',
    document: '',
    order: 0,
    isActive: true,
};

export default function AdminContentCategoryPage({ params }) {
    const { category } = use(params);
    const router = useRouter();
    
    const config = EDITABLE_PAGES[category];
    
    const [activeSlug, setActiveSlug] = useState('');
    const [sections, setSections] = useState([]);
    const [formData, setFormData] = useState(defaultForm);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!config) {
            router.push('/admin/dashboard');
            return;
        }
        setActiveSlug(config.slugs[0]);
    }, [category, config, router]);

    async function loadSlugData(slug) {
        if (!slug) return;
        try {
            setErrorMessage('');
            setLoading(true);
            const data = await apiClient.adminGetDynamicContent(category, slug);
            const list = Array.isArray(data?.sections) ? data.sections : [];
            setSections(list);
            setFormData({
                ...defaultForm,
                title: data?.title || config.titles[slug] || '',
            });
        } catch (error) {
            setErrorMessage(error.message || 'Failed to load content.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (activeSlug) {
            loadSlugData(activeSlug);
        }
    }, [activeSlug]);

    async function uploadDocument(file) {
        if (!file) return;
        setIsUploading(true);
        setErrorMessage('');
        try {
            const uploaded = await apiClient.adminUploadFile(file, {
                folderKind: category,
                type: 'pdf',
                preferredName: `${activeSlug}-document`,
            });
            setFormData((prev) => ({ ...prev, document: uploaded.filePath }));
        } catch (error) {
            setErrorMessage(error.message || 'Failed to upload PDF.');
        } finally {
            setIsUploading(false);
        }
    }

    function editSection(item) {
        setFormData({
            id: item.id,
            title: item.title || config.titles[activeSlug],
            content: item.content || '',
            document: item.document || '',
            order: item.order || 0,
            isActive: item.isActive !== false,
        });
    }

    async function saveSection(event) {
        event.preventDefault();
        setIsSaving(true);
        setErrorMessage('');
        try {
            await apiClient.adminSaveDynamicContent(category, activeSlug, {
                ...formData,
                title: formData.title.trim() || config.titles[activeSlug],
                content: formData.content.trim(),
                document: formData.document.trim(),
                order: Number.parseInt(String(formData.order), 10) || 0,
                id: formData.id || undefined,
            });
            await loadSlugData(activeSlug);
            setFormData({
                ...defaultForm,
                title: config.titles[activeSlug],
            });
        } catch (error) {
            setErrorMessage(error.message || 'Failed to save content.');
        } finally {
            setIsSaving(false);
        }
    }

    async function deleteSection(id) {
        if (!window.confirm('Delete this section?')) return;
        try {
            setErrorMessage('');
            await apiClient.adminDeleteDynamicContent(category, activeSlug, id);
            await loadSlugData(activeSlug);
        } catch (error) {
            setErrorMessage(error.message || 'Failed to delete section.');
        }
    }

    if (!config) return null;

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{config.title}</h1>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
                        Category: {category}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit">
                    {config.slugs.map((slug) => (
                        <button
                            key={slug}
                            onClick={() => setActiveSlug(slug)}
                            className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
                                activeSlug === slug 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            {config.titles[slug]}
                        </button>
                    ))}
                </div>

                {errorMessage ? (
                    <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
                ) : null}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Sections</h2>
                        {loading ? (
                            <div className="py-10 text-center text-gray-500"><i className="fas fa-spinner fa-spin mr-2"></i>Loading...</div>
                        ) : sections.length === 0 ? (
                            <p className="text-sm text-gray-600">No sections found.</p>
                        ) : (
                            <div className="space-y-3">
                                {sections.map((item) => (
                                    <div key={item.id} className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start gap-3">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                                                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">
                                                    Order: {item.order || 0} | {item.isActive ? 'Active' : 'Inactive'}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => editSection(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><i className="fas fa-edit"></i></button>
                                                <button onClick={() => deleteSection(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><i className="fas fa-trash"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">{formData.id ? 'Edit Section' : 'Create Section'}</h2>
                            <select 
                                className="text-[10px] font-bold uppercase tracking-widest border rounded-lg px-2 py-1 bg-gray-50"
                                onChange={(e) => {
                                    const templates = {
                                        grid: { layout: 'grid', items: [{ title: 'Item 1', description: 'Desc 1', icon: 'fa-star' }] },
                                        table: { layout: 'table', headers: ['Header 1', 'Header 2'], items: [{ col1: 'Val 1', col2: 'Val 2' }] },
                                        accordion: { layout: 'accordion', items: [{ title: 'Question 1', description: 'Answer 1' }] },
                                        tabs: { layout: 'tabs', items: [{ label: 'Tab 1', title: 'Title 1', content: 'Content 1' }] }
                                    };
                                    const template = templates[e.target.value];
                                    if (template) setFormData(prev => ({ ...prev, content: JSON.stringify(template, null, 2) }));
                                }}
                            >
                                <option value="">Layout Template...</option>
                                <option value="grid">Grid</option>
                                <option value="table">Table</option>
                                <option value="accordion">Accordion</option>
                                <option value="tabs">Tabs</option>
                            </select>
                        </div>
                        <form onSubmit={saveSection} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">Section Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">Dynamic Content Editor</label>
                                <JsonFormEditor 
                                    value={formData.content} 
                                    onChange={(newContent) => setFormData({ ...formData, content: newContent })} 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">PDF Document</label>
                                    <input type="file" accept="application/pdf" onChange={(e) => uploadDocument(e.target.files?.[0])} className="text-xs" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">Order Index</label>
                                    <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setFormData({ ...defaultForm, title: config.titles[activeSlug] })} className="text-xs font-bold text-gray-400 uppercase tracking-widest">Clear</button>
                                <button type="submit" disabled={isSaving || isUploading} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50">
                                    {isSaving ? 'Processing...' : formData.id ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
