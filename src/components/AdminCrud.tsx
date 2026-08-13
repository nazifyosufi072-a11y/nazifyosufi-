'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Loader2, Image as ImageIcon, CheckCircle, Eye } from 'lucide-react';

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'image';
  options?: { value: string; label: string }[];
  showInTable?: boolean;
}

interface AdminCrudProps {
  resource: string;
  title: string;
  description: string;
  fields: FieldConfig[];
  lang: string;
}

export default function AdminCrud({ resource, title, description, fields, lang }: AdminCrudProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  const isFa = lang === 'fa';

  useEffect(() => {
    fetchItems();
  }, [resource]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${resource}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    const initialData: Record<string, any> = {};
    fields.forEach((f) => {
      if (f.type === 'boolean') initialData[f.name] = false;
      else if (f.type === 'number') initialData[f.name] = 0;
      else initialData[f.name] = '';
    });
    setFormData(initialData);
    setEditingItem(null);
    setActionError('');
    setModalOpen(true);
  };

  const handleOpenEdit = async (item: any) => {
    const editData: Record<string, any> = {};
    fields.forEach((f) => {
      editData[f.name] = item[f.name] !== undefined && item[f.name] !== null ? item[f.name] : '';
    });
    setFormData(editData);
    setEditingItem(item);
    setActionError('');
    setModalOpen(true);

    if (resource === 'messages' && !item.read) {
      try {
        await fetch(`/api/admin/messages/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...item, read: true }),
        });
        fetchItems();
      } catch (err) {
        console.error('Error marking message as read:', err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isFa ? 'آیا از حذف این مورد اطمینان دارید؟' : 'Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/${resource}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchItems();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (name: string, file: File) => {
    setUploadingField(name);
    setActionError('');
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        handleInputChange(name, data.url);
      } else {
        setActionError(data.error || 'File upload failed');
      }
    } catch (e) {
      console.error(e);
      setActionError('File upload failed due to network error.');
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setActionError('');

    const url = editingItem
      ? `/api/admin/${resource}/${editingItem.id}`
      : `/api/admin/${resource}`;
    const method = editingItem ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchItems();
      } else {
        const data = await res.json();
        setActionError(data.error || 'Failed to save changes.');
      }
    } catch (err) {
      console.error(err);
      setActionError('Failed to save changes due to network error.');
    } finally {
      setSaveLoading(false);
    }
  };

  // Filter items based on search
  const filteredItems = items.filter((item) => {
    return fields.some((field) => {
      if (field.type === 'text' || field.type === 'textarea') {
        const val = item[field.name];
        return val && typeof val === 'string' && val.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  });

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
        </div>
        
        {/* Only messages cannot be added manually */}
        {resource !== 'messages' && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>{isFa ? 'افزودن جدید' : 'Add New'}</span>
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center p-4 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-450">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
            placeholder={isFa ? 'جستجو...' : 'Search...'}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-2" />
            <span>{isFa ? 'در حال بارگذاری اطلاعات...' : 'Loading data...'}</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            {isFa ? 'هیچ موردی یافت نشد.' : 'No records found.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-650 dark:text-slate-450">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-250 font-semibold bg-slate-50/50 dark:bg-slate-950/20">
                  {fields
                    .filter((f) => f.showInTable !== false)
                    .map((f) => (
                      <th key={f.name} className="py-3.5 px-6 text-start">
                        {f.label}
                      </th>
                    ))}
                  <th className="py-3.5 px-6 text-center">{isFa ? 'عملیات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    {fields
                      .filter((f) => f.showInTable !== false)
                      .map((f) => {
                        const val = item[f.name];
                        return (
                          <td key={f.name} className="py-4 px-6">
                            {f.type === 'boolean' ? (
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                  val
                                    ? 'text-emerald-700 bg-emerald-500/10'
                                    : 'text-slate-550 bg-slate-100 dark:bg-slate-800'
                                }`}
                              >
                                {val ? (isFa ? 'بله' : 'Yes') : (isFa ? 'خیر' : 'No')}
                              </span>
                            ) : f.type === 'image' ? (
                              val ? (
                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center bg-slate-100 dark:bg-slate-950">
                                  <ImageIcon className="w-5 h-5 text-indigo-500" />
                                </div>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )
                            ) : typeof val === 'string' && val.length > 50 ? (
                              <span className="line-clamp-1">{val}</span>
                            ) : (
                              val !== undefined && val !== null ? String(val) : <span className="text-slate-400">-</span>
                            )}
                          </td>
                        );
                      })}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        {resource === 'messages' ? (
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-indigo-500/10 hover:text-indigo-600 cursor-pointer"
                            title="Read message"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-indigo-500/10 hover:text-indigo-600 cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-red-500/10 hover:text-red-600 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* CRUD Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-4 mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingItem
                  ? `${isFa ? 'ویرایش' : 'Edit'} ${title}`
                  : `${isFa ? 'ایجاد' : 'Create'} ${title}`}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error banner */}
            {actionError && (
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm mb-6">
                {actionError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-5 flex-grow">
              {fields.map((f) => {
                const value = formData[f.name] !== undefined ? formData[f.name] : '';
                return (
                  <div key={f.name} className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {f.label}
                    </label>

                    {/* Disable message reading edit inputs */}
                    {resource === 'messages' ? (
                      <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-850 text-sm min-h-11">
                        {String(value)}
                      </div>
                    ) : f.type === 'textarea' ? (
                      <textarea
                        value={value}
                        rows={4}
                        onChange={(e) => handleInputChange(f.name, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                      />
                    ) : f.type === 'boolean' ? (
                      <div className="flex items-center gap-2 py-1">
                        <input
                          type="checkbox"
                          checked={!!value}
                          id={f.name}
                          onChange={(e) => handleInputChange(f.name, e.target.checked)}
                          className="h-4.5 w-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={f.name} className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {isFa ? 'فعال / بله' : 'Active / Yes'}
                        </label>
                      </div>
                    ) : f.type === 'select' ? (
                      <select
                        value={value}
                        onChange={(e) => handleInputChange(f.name, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                      >
                        <option value="">-- {isFa ? 'انتخاب کنید' : 'Select'} --</option>
                        {f.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : f.type === 'image' ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(f.name, e.target.value)}
                            className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none text-xs"
                            placeholder="/uploads/myimage.jpg"
                          />
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              id={`file-${f.name}`}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(f.name, file);
                              }}
                              className="hidden"
                            />
                            <label
                              htmlFor={`file-${f.name}`}
                              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer"
                            >
                              {uploadingField === f.name ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>{isFa ? 'درحال آپلود...' : 'Uploading...'}</span>
                                </>
                              ) : (
                                <>
                                  <ImageIcon className="w-3.5 h-3.5" />
                                  <span>{isFa ? 'انتخاب فایل' : 'Choose File'}</span>
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                        {value && (
                          <div className="inline-flex items-center gap-1 text-[11px] text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                            <CheckCircle className="w-3 h-3" />
                            <span>{isFa ? 'آپلود شد' : 'Uploaded'}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type={f.type === 'number' ? 'number' : 'text'}
                        value={value}
                        onChange={(e) =>
                          handleInputChange(
                            f.name,
                            f.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
                          )
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
                      />
                    )}
                  </div>
                );
              })}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-850 mt-8">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 font-semibold text-slate-700 dark:text-slate-300 text-sm cursor-pointer"
                >
                  {isFa ? 'انصراف' : 'Cancel'}
                </button>
                {resource !== 'messages' && (
                  <button
                    type="submit"
                    disabled={saveLoading || uploadingField !== null}
                    className="flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/55 text-sm cursor-pointer"
                  >
                    {saveLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{isFa ? 'ذخیره تغییرات' : 'Save Changes'}</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
