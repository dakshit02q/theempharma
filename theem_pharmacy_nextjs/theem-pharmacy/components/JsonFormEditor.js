'use client';

import React, { useState, useEffect } from 'react';

export default function JsonFormEditor({ value, onChange }) {
    const [data, setData] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [rawMode, setRawMode] = useState(false);

    useEffect(() => {
        try {
            if (value && typeof value === 'string') {
                const parsed = JSON.parse(value);
                setData(parsed);
                setIsValid(true);
            } else if (value && typeof value === 'object') {
                setData(value);
                setIsValid(true);
            } else {
                setData({});
                setIsValid(true);
            }
        } catch (e) {
            setIsValid(false);
        }
    }, [value, rawMode]);

    const handleUpdate = (newData) => {
        setData(newData);
        onChange(JSON.stringify(newData, null, 2));
    };

    if (!isValid && !rawMode) {
        return (
            <div className="space-y-2">
                <div className="text-xs text-red-500 bg-red-50 p-2 rounded border border-red-100">Invalid JSON format. Cannot render form interface. Please fix the raw JSON first.</div>
                <textarea
                    rows={10}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-3 py-2 border border-red-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-red-500"
                />
            </div>
        );
    }

    if (rawMode) {
        return (
            <div className="space-y-2">
                <div className="flex justify-end">
                    <button type="button" onClick={() => setRawMode(false)} className="text-[10px] text-blue-600 font-bold uppercase tracking-widest hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                        <i className="fas fa-magic mr-1.5"></i> Switch to Form Interface
                    </button>
                </div>
                <textarea
                    rows={15}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 shadow-inner"
                />
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <i className="fas fa-list-alt text-gray-400"></i> Dynamic Content Editor
                </span>
                <button type="button" onClick={() => setRawMode(true)} className="text-[10px] text-gray-600 hover:text-blue-600 font-bold uppercase tracking-widest hover:bg-white px-3 py-1.5 rounded shadow-sm border border-transparent hover:border-gray-200 transition-all">
                    <i className="fas fa-code mr-1.5"></i> Edit Raw JSON
                </button>
            </div>
            
            {Object.keys(data).length === 0 ? (
                <div className="text-sm text-gray-500 text-center py-10 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                    No structure defined. Select a layout template or add raw JSON to begin.
                </div>
            ) : (
                <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                    <ObjectEditor data={data} onChange={handleUpdate} path="" />
                </div>
            )}
        </div>
    );
}

function ObjectEditor({ data, onChange, path }) {
    if (typeof data !== 'object' || data === null) {
        return <div className="text-xs text-gray-500">Unsupported data type at {path}</div>;
    }

    const handleChange = (key, val) => {
        const newData = Array.isArray(data) ? [...data] : { ...data };
        newData[key] = val;
        onChange(newData);
    };

    const handleRemoveItem = (index) => {
        if (Array.isArray(data)) {
            const newData = [...data];
            newData.splice(index, 1);
            onChange(newData);
        }
    };

    const handleAddItem = () => {
        if (Array.isArray(data)) {
            const newData = [...data];
            // Guess structure of new item based on first item, or default to string
            let template = '';
            if (data.length > 0) {
                if (typeof data[0] === 'object' && data[0] !== null) {
                    template = Object.keys(data[0]).reduce((acc, k) => ({...acc, [k]: ''}), {});
                }
            } else {
                template = {}; // Start with an empty object instead of string for better flexibility
            }
            newData.push(template);
            onChange(newData);
        }
    };

    if (Array.isArray(data)) {
        return (
            <div className="space-y-3">
                {data.map((item, index) => (
                    <div key={index} className="relative border border-gray-200 bg-gray-50/30 rounded-xl p-4 shadow-sm group transition-all hover:border-gray-300">
                        <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button type="button" onClick={() => handleRemoveItem(index)} className="w-7 h-7 rounded-lg bg-white border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 text-xs shadow-sm" title="Remove Item">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                        <div className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center text-[8px]">{index + 1}</span>
                            Array Item
                        </div>
                        {typeof item === 'object' && item !== null ? (
                            <ObjectEditor data={item} onChange={(val) => handleChange(index, val)} path={`${path}[${index}]`} />
                        ) : (
                            <input 
                                type="text" 
                                value={item} 
                                onChange={(e) => handleChange(index, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm shadow-sm bg-white"
                            />
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddItem} className="w-full py-3 mt-2 border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors">
                    <i className="fas fa-plus mr-2"></i> Add New Item
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {Object.keys(data).map((key) => {
                const val = data[key];
                const isObject = typeof val === 'object' && val !== null;
                const isArray = Array.isArray(val);
                
                // Format label to be more human readable (e.g. "primaryCtaText" -> "Primary Cta Text")
                const labelText = key.replace(/([A-Z])/g, ' $1').trim();
                
                return (
                    <div key={key} className={isObject ? 'pt-2' : ''}>
                        <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">
                            {labelText}
                        </label>
                        {isArray || isObject ? (
                            <div className="pl-4 border-l-2 border-blue-200/50 py-2 mt-1">
                                <ObjectEditor data={val} onChange={(newVal) => handleChange(key, newVal)} path={`${path}.${key}`} />
                            </div>
                        ) : (
                            (() => {
                                // Detect if this is an image field by key name or value pattern
                                const keyLower = key.toLowerCase();
                                const isImageField = 
                                    keyLower.includes('image') || 
                                    keyLower.includes('img') || 
                                    keyLower === 'src' ||
                                    keyLower.includes('photo') ||
                                    keyLower.includes('banner') ||
                                    keyLower.includes('thumbnail') ||
                                    (typeof val === 'string' && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(val));

                                if (isImageField) {
                                    return (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                placeholder="Paste image URL or path (e.g. /images/photo.jpg)"
                                                value={val === null ? '' : val}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm shadow-sm bg-white font-mono"
                                            />
                                            {val && val.trim() !== '' && (
                                                <div className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-blue-100 bg-gray-50 shadow-inner">
                                                    <img 
                                                        src={val} 
                                                        alt="Preview" 
                                                        className="w-full h-full object-cover" 
                                                        onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                                                    />
                                                    <div className="hidden absolute inset-0 items-center justify-center text-gray-400 text-xs flex-col gap-2">
                                                        <i className="fas fa-image-slash text-2xl"></i>
                                                        <span>Image not found at this path</span>
                                                    </div>
                                                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Preview</div>
                                                </div>
                                            )}
                                            {(!val || val.trim() === '') && (
                                                <div className="w-full h-20 rounded-xl border-2 border-dashed border-blue-100 bg-gray-50 flex items-center justify-center text-gray-400 text-xs gap-2">
                                                    <i className="fas fa-image"></i>
                                                    <span>Enter an image URL above to see a preview</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                return val && val.length > 100 ? (
                                    <textarea
                                        value={val || ''}
                                        onChange={(e) => handleChange(key, e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm shadow-sm bg-white"
                                    />
                                ) : (
                                    <input
                                        type={typeof val === 'number' ? 'number' : 'text'}
                                        value={val === null ? '' : val}
                                        onChange={(e) => handleChange(key, e.target.type === 'number' ? Number(e.target.value) : e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm shadow-sm bg-white"
                                    />
                                );
                            })()
                        )}
                    </div>
                );
            })}
        </div>
    );
}
