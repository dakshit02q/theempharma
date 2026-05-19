'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { apiClient } from '@/lib/api-client';

export default function AdminResearch() {
    const [activeTab, setActiveTab] = useState('projects');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    
    // Projects state
    const [projects, setProjects] = useState([]);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [projectForm, setProjectForm] = useState({
        title: '', description: '', principalInvestigator: '', 
        startDate: '', endDate: '', status: 'ongoing', 
        fundingAgency: '', amount: '', publicationCount: 0, isActive: true
    });

    // Publications state
    const [publications, setPublications] = useState([]);
    const [showPubModal, setShowPubModal] = useState(false);
    const [editingPub, setEditingPub] = useState(null);
    const [pubForm, setPubForm] = useState({
        title: '', authors: '', journal: '', year: new Date().getFullYear(),
        volume: '', pages: '', doi: '', impactFactor: '', isActive: true
    });

    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [projData, pubData] = await Promise.all([
                apiClient.adminGetResearchProjects(),
                apiClient.adminGetResearchPublications()
            ]);
            setProjects(Array.isArray(projData) ? projData : []);
            setPublications(Array.isArray(pubData) ? pubData : []);
        } catch (error) {
            setErrorMessage(error.message || 'Failed to load research data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    // Project Actions
    const handleOpenProjectModal = (proj = null) => {
        setErrorMessage('');
        if (proj) {
            setEditingProject(proj);
            setProjectForm({ ...proj, startDate: proj.startDate?.split('T')[0] || '', endDate: proj.endDate?.split('T')[0] || '' });
        } else {
            setEditingProject(null);
            setProjectForm({ title: '', description: '', principalInvestigator: '', startDate: '', endDate: '', status: 'ongoing', fundingAgency: '', amount: '', publicationCount: 0, isActive: true });
        }
        setShowProjectModal(true);
    };

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (editingProject) await apiClient.adminUpdateResearchProject(editingProject.id, projectForm);
            else await apiClient.adminCreateResearchProject(projectForm);
            await fetchData();
            setShowProjectModal(false);
        } catch (error) { setErrorMessage(error.message); }
        finally { setIsSaving(false); }
    };

    const handleProjectDelete = async (id) => {
        if (!confirm('Delete project?')) return;
        setDeletingId(id);
        try { await apiClient.adminDeleteResearchProject(id); await fetchData(); }
        catch (error) { setErrorMessage(error.message); }
        finally { setDeletingId(null); }
    };

    // Publication Actions
    const handleOpenPubModal = (pub = null) => {
        setErrorMessage('');
        if (pub) {
            setEditingPub(pub);
            setPubForm({ ...pub });
        } else {
            setEditingPub(null);
            setPubForm({ title: '', authors: '', journal: '', year: new Date().getFullYear(), volume: '', pages: '', doi: '', impactFactor: '', isActive: true });
        }
        setShowPubModal(true);
    };

    const handlePubSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (editingPub) await apiClient.adminUpdateResearchPublication(editingPub.id, pubForm);
            else await apiClient.adminCreateResearchPublication(pubForm);
            await fetchData();
            setShowPubModal(false);
        } catch (error) { setErrorMessage(error.message); }
        finally { setIsSaving(false); }
    };

    const handlePubDelete = async (id) => {
        if (!confirm('Delete publication?')) return;
        setDeletingId(id);
        try { await apiClient.adminDeleteResearchPublication(id); await fetchData(); }
        catch (error) { setErrorMessage(error.message); }
        finally { setDeletingId(null); }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">Research Management</h1>
                    <div className="flex bg-white rounded-lg p-1 border border-gray-200">
                        <button onClick={() => setActiveTab('projects')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Projects</button>
                        <button onClick={() => setActiveTab('publications')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'publications' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Publications</button>
                    </div>
                </div>

                {errorMessage && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{errorMessage}</div>}

                {activeTab === 'projects' ? (
                    <div className="space-y-4">
                        <div className="flex justify-end">
                            <button onClick={() => handleOpenProjectModal()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"><i className="fas fa-plus mr-2"></i> New Project</button>
                        </div>
                        {loading ? <div className="flex justify-center py-12"><i className="fas fa-spinner fa-spin text-3xl text-blue-600"></i></div> : (
                            <div className="grid grid-cols-1 gap-4">
                                {projects.map(proj => (
                                    <div key={proj.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg text-gray-900">{proj.title}</h3>
                                                <p className="text-sm text-gray-600 mt-1">PI: {proj.principalInvestigator}</p>
                                                <div className="flex flex-wrap gap-3 mt-2">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${proj.status === 'completed' ? 'bg-green-100 text-green-800' : proj.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{proj.status}</span>
                                                    <span className="text-xs text-gray-500"><i className="far fa-calendar-alt mr-1"></i> {proj.startDate ? new Date(proj.startDate).toLocaleDateString() : 'N/A'}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <button 
                                                    onClick={() => handleOpenProjectModal(proj)} 
                                                    className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs font-medium"
                                                >
                                                    <i className="fas fa-edit mr-1.5"></i> Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleProjectDelete(proj.id)} 
                                                    disabled={deletingId === proj.id} 
                                                    className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-medium disabled:opacity-50"
                                                >
                                                    <i className={`fas ${deletingId === proj.id ? 'fa-spinner fa-spin' : 'fa-trash'} mr-1.5`}></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {projects.length === 0 && <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">No projects found.</div>}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-end">
                            <button onClick={() => handleOpenPubModal()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"><i className="fas fa-plus mr-2"></i> New Publication</button>
                        </div>
                        {loading ? <div className="flex justify-center py-12"><i className="fas fa-spinner fa-spin text-3xl text-blue-600"></i></div> : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium text-gray-500">Publication</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-500">Journal/Year</th>
                                            <th className="px-6 py-3 text-right font-medium text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {publications.map(pub => (
                                            <tr key={pub.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{pub.title}</div>
                                                    <div className="text-xs text-gray-500 line-clamp-1">{pub.authors}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-900">{pub.journal}</div>
                                                    <div className="text-xs text-gray-500">{pub.year}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button 
                                                            onClick={() => handleOpenPubModal(pub)} 
                                                            className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-xs"
                                                            title="Edit"
                                                        >
                                                            <i className="fas fa-edit mr-1"></i> Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => handlePubDelete(pub.id)} 
                                                            disabled={deletingId === pub.id} 
                                                            className="inline-flex items-center px-2 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors text-xs disabled:opacity-50"
                                                            title="Delete"
                                                        >
                                                            <i className={`fas ${deletingId === pub.id ? 'fa-spinner fa-spin' : 'fa-trash'} mr-1`}></i> Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Project Modal */}
                {showProjectModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                            <h2 className="text-xl font-bold mb-4">{editingProject ? 'Edit Project' : 'New Research Project'}</h2>
                            <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Project Title *</label><input type="text" required value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">PI Name</label><input type="text" value={projectForm.principalInvestigator} onChange={e => setProjectForm({...projectForm, principalInvestigator: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                <div><label className="block text-sm font-medium mb-1">Start Date</label><input type="date" value={projectForm.startDate} onChange={e => setProjectForm({...projectForm, startDate: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                <div><label className="block text-sm font-medium mb-1">End Date</label><input type="date" value={projectForm.endDate} onChange={e => setProjectForm({...projectForm, endDate: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                <div><label className="block text-sm font-medium mb-1">Status</label><select value={projectForm.status} onChange={e => setProjectForm({...projectForm, status: e.target.value})} className="w-full border rounded-lg p-2"><option value="ongoing">Ongoing</option><option value="completed">Completed</option><option value="proposed">Proposed</option></select></div>
                                <div><label className="block text-sm font-medium mb-1">Funding Agency</label><input type="text" value={projectForm.fundingAgency} onChange={e => setProjectForm({...projectForm, fundingAgency: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Description</label><textarea rows="3" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full border rounded-lg p-2"></textarea></div>
                                <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
                                    <button type="button" onClick={() => setShowProjectModal(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                                    <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50">{isSaving ? 'Saving...' : 'Save Project'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Publication Modal */}
                {showPubModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                            <h2 className="text-xl font-bold mb-4">{editingPub ? 'Edit Publication' : 'New Publication'}</h2>
                            <form onSubmit={handlePubSubmit} className="grid grid-cols-1 gap-4">
                                <div><label className="block text-sm font-medium mb-1">Title *</label><input type="text" required value={pubForm.title} onChange={e => setPubForm({...pubForm, title: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                <div><label className="block text-sm font-medium mb-1">Authors</label><input type="text" value={pubForm.authors} onChange={e => setPubForm({...pubForm, authors: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-medium mb-1">Journal</label><input type="text" value={pubForm.journal} onChange={e => setPubForm({...pubForm, journal: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                    <div><label className="block text-sm font-medium mb-1">Year</label><input type="number" value={pubForm.year} onChange={e => setPubForm({...pubForm, year: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div><label className="block text-sm font-medium mb-1">Volume</label><input type="text" value={pubForm.volume} onChange={e => setPubForm({...pubForm, volume: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                    <div><label className="block text-sm font-medium mb-1">Pages</label><input type="text" value={pubForm.pages} onChange={e => setPubForm({...pubForm, pages: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                    <div><label className="block text-sm font-medium mb-1">Impact Factor</label><input type="text" value={pubForm.impactFactor} onChange={e => setPubForm({...pubForm, impactFactor: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                </div>
                                <div><label className="block text-sm font-medium mb-1">DOI / Link</label><input type="text" value={pubForm.doi} onChange={e => setPubForm({...pubForm, doi: e.target.value})} className="w-full border rounded-lg p-2" /></div>
                                <div className="flex justify-end space-x-3 mt-4">
                                    <button type="button" onClick={() => setShowPubModal(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                                    <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50">{isSaving ? 'Saving...' : 'Save Publication'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
