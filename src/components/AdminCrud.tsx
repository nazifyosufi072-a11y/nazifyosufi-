'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Search, X, Loader2, Image as ImageIcon, CheckCircle, Eye, ExternalLink, ArrowRight } from 'lucide-react';

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
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const [saveAndExit, setSaveAndExit] = useState(false);

  const isFa = lang === 'fa';

  useEffect(() => {
    fetchItems();
  }, [resource]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${resource}?t=${Date.now()}`);
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

  const executeSave = async (shouldExit: boolean) => {
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
        if (shouldExit) {
          router.push(`/${lang}`);
          router.refresh();
        } else {
          fetchItems();
          router.refresh();
        }
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSave(saveAndExit);
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
        
        <div className="flex items-center gap-3">
          <a
            href={`/${lang}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm text-xs cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-[#B86B45]" />
            <span>{isFa ? 'مشاهده سایت زنده' : 'View Live Site'}</span>
          </a>

          {/* Only messages cannot be added manually */}
          {resource !== 'messages' && (
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md cursor-pointer text-xs sm:text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{isFa ? 'افزودن جدید' : 'Add New'}</span>
            </button>
          )}
        </div>
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
      <div className="rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center p-12 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            {isFa ? 'موردی یافت نشد.' : 'No records found.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-slate-50 dark:bg-slate-850/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  {fields
                    .filter((f) => f.showInTable !== false)
                    .map((f) => (
                      <th key={f.name} className="px-6 py-4">
                        {f.label}
                      </th>
                    ))}
                  <th className="px-6 py-4 text-end">{isFa ? 'عملیات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/30 transition-colors">
                    {fields
                      .filter((f) => f.showInTable !== false)
                      .map((f) => (
                        <td key={f.name} className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300 max-w-xs truncate">
                          {f.type === 'boolean' ? (
                            item[f.name] ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-500">
                                {isFa ? 'بله' : 'Yes'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-500/10 text-slate-400">
                                {isFa ? 'خیر' : 'No'}
                              </span>
                            )
                          ) : f.type === 'image' && item[f.name] ? (
                            <div className="flex items-center gap-2">
                              <img
                                src={item[f.name]}
                                alt=""
                                className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 bg-slate-100"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                              <span className="truncate text-xs text-slate-500">{item[f.name]}</span>
                            </div>
                          ) : (
                            String(item[f.name] ?? '-')
                          )}
                        </td>
                      ))}
                    <td className="px-6 py-4 text-end whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 cursor-pointer"
                          title={isFa ? 'ویرایش' : 'Edit'}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {resource !== 'messages' && (
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-slate-600 dark:text-slate-300 hover:text-red-600 cursor-pointer"
                            title={isFa ? 'حذف' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {editingItem
                ? isFa ? `ویرایش ${title}` : `Edit ${title}`
                : isFa ? `افزودن ${title}` : `Add New ${title}`}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              {isFa ? 'اطلاعات مورد نظر را وارد کرده و ذخیره نمایید.' : 'Fill in the details and save changes.'}
            </p>

            {actionError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold">
                {actionError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              {fields.map((f) => {
                const value = formData[f.name] ?? '';

                return (
                  <div key={f.name} className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {f.label}
                    </label>

                    {f.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        value={value}
                        onChange={(e) => handleInputChange(f.name, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm leading-relaxed"
                      />
                    ) : f.type === 'boolean' ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id={f.name}
                          checked={Boolean(value)}
                          onChange={(e) => handleInputChange(f.name, e.target.checked)}
                          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <label htmlFor={f.name} className="text-xs text-slate-600 dark:text-slate-400 font-medium cursor-pointer">
                          {isFa ? 'فعال / برگزیده' : 'Enabled / Featured'}
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
                          <div className="flex items-center gap-3">
                            <div className="inline-flex items-center gap-1 text-[11px] text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                              <CheckCircle className="w-3 h-3" />
                              <span>{isFa ? 'آپلود شد' : 'Uploaded'}</span>
                            </div>
                            <img
                              src={value}
                              alt=""
                              className="h-10 w-auto rounded border border-slate-200 dark:border-slate-700 object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-100 dark:border-slate-850 mt-8">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 font-semibold text-slate-700 dark:text-slate-300 text-sm cursor-pointer"
                >
                  {isFa ? 'انصراف' : 'Cancel'}
                </button>

                {resource !== 'messages' && (
                  <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                    {/* Save & Exit button */}
                    <button
                      type="button"
                      disabled={saveLoading || uploadingField !== null}
                      onClick={() => executeSave(true)}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-sm cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                      {saveLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      <span>{isFa ? 'ذخیره و خروج به سایت' : 'Save & Exit to Site'}</span>
                    </button>

                    {/* Standard Save */}
                    <button
                      type="submit"
                      disabled={saveLoading || uploadingField !== null}
                      onClick={() => setSaveAndExit(false)}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/55 text-sm cursor-pointer shadow-md"
                    >
                      {saveLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      <span>{isFa ? 'ذخیره تغییرات' : 'Save Changes'}</span>
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
