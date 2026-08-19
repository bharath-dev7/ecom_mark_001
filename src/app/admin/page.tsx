'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, Plus, Pencil, Trash2, Save, X, Package, ShieldCheck } from 'lucide-react';
import { supabase, Product } from '@/lib/supabase';
import { mockProducts } from '@/lib/mockData';
import { SectionDivider } from '@/components/OrnamentalIcons';

type ProductForm = {
  name: string;
  slug: string;
  price: string;
  mrp: string;
  fabric: string;
  color: string;
  occasion: string;
  region: string;
  description: string;
  in_stock: boolean;
  featured: boolean;
};

const emptyForm: ProductForm = {
  name: '',
  slug: '',
  price: '',
  mrp: '',
  fabric: 'Silk',
  color: '',
  occasion: 'Wedding',
  region: '',
  description: '',
  in_stock: true,
  featured: false,
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    setSupabaseConfigured(!!url && url.length > 0);

    const checkSession = async () => {
      if (!url || url.length === 0) {
        setProducts(mockProducts);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        fetchProducts();
      }
    };
    checkSession();
  }, []);

  const fetchProducts = async () => {
    if (!supabaseConfigured) {
      setProducts(mockProducts);
      return;
    }
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setProducts(data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (!supabaseConfigured) {
      if (email === 'admin@demo.com' && password === 'admin123') {
        setIsAuthenticated(true);
        setProducts(mockProducts);
      } else {
        setAuthError('Demo credentials: admin@demo.com / admin123');
      }
      setAuthLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
    } else {
      setIsAuthenticated(true);
      fetchProducts();
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    if (supabaseConfigured) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const startCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsEditing(true);
  };

  const startEdit = (product: Product) => {
    setForm({
      name: product.name,
      slug: product.slug,
      price: String(product.price),
      mrp: String(product.mrp || ''),
      fabric: product.fabric,
      color: product.color,
      occasion: product.occasion,
      region: product.region || '',
      description: product.description || '',
      in_stock: product.in_stock,
      featured: product.featured,
    });
    setEditingId(product.id);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!supabaseConfigured) {
      setIsEditing(false);
      return;
    }

    const payload = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      price: parseFloat(form.price),
      mrp: form.mrp ? parseFloat(form.mrp) : null,
      fabric: form.fabric,
      color: form.color,
      occasion: form.occasion,
      region: form.region || null,
      description: form.description || null,
      in_stock: form.in_stock,
      featured: form.featured,
    };

    if (editingId) {
      await supabase.from('products').update(payload).eq('id', editingId);
    } else {
      await supabase.from('products').insert(payload);
    }

    setIsEditing(false);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    if (supabaseConfigured) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    } else {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const autoSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#FAF6EE] font-serif py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="p-8 rounded-lg bg-[#FFFDF8] border-2 border-[#C59B27] shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#6A091A] border-2 border-[#C59B27] flex items-center justify-center mx-auto mb-4 text-[#E8C86B]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-[#6A091A] uppercase tracking-wider">
                BOUTIQUE ADMIN LOGIN
              </h1>
              <p className="text-xs font-sans text-[#7C6354] mt-1">
                Manage handloom inventory & collections
              </p>
              {!supabaseConfigured && (
                <p className="text-xs font-mono text-[#6A091A] mt-3 p-2 rounded bg-[#FAF6EE] border border-[#C59B27]/40">
                  Demo Mode — Use admin@demo.com / admin123
                </p>
              )}
            </div>

            <form onSubmit={handleLogin} className="space-y-4 font-sans">
              <div>
                <label className="text-xs font-serif font-bold text-[#7C6354] uppercase tracking-wider mb-1 block">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@demo.com"
                  className="w-full px-4 py-2.5 rounded bg-[#FAF6EE] border border-[#C59B27]/40 text-sm text-[#241416] focus:border-[#6A091A] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-serif font-bold text-[#7C6354] uppercase tracking-wider mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded bg-[#FAF6EE] border border-[#C59B27]/40 text-sm text-[#241416] focus:border-[#6A091A] focus:outline-none"
                />
              </div>

              {authError && (
                <p className="text-xs text-red-700 bg-red-100 border border-red-300 rounded p-2.5">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="btn-maroon-gold w-full py-3 rounded-full font-serif font-bold text-xs tracking-widest flex items-center justify-center gap-2 uppercase shadow-md"
              >
                <LogIn className="w-4 h-4 text-[#E8C86B]" />
                {authLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE ADMIN'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="bg-[#FAF6EE] min-h-screen font-serif text-[#241416]">
      {/* Header Banner */}
      <section className="py-8 bg-[#38030B] border-b-2 border-[#C59B27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#E8C86B] uppercase tracking-wider">
              ROYAL BOUTIQUE MANAGEMENT
            </h1>
            <p className="text-xs font-sans text-[#EBE2D0] mt-1">
              Catalog inventory: {products.length} products
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={startCreate} className="btn-maroon-gold text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 uppercase">
              <Plus className="w-4 h-4" />
              <span>ADD NEW WEAVE</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-full bg-[#FAF6EE] text-[#6A091A] border border-[#C59B27] hover:bg-[#6A091A] hover:text-[#E8C86B] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Products Table */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-[#FFFDF8] border border-[#E2D7C3] shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-serif">
              <thead>
                <tr className="bg-[#38030B] text-[#E8C86B] border-b border-[#C59B27] uppercase tracking-wider">
                  <th className="px-5 py-3">Product Name</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Fabric</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3 hidden md:table-cell">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D7C3]">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FAF6EE] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#6A091A] text-[#E8C86B] flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-[#6A091A] text-sm">{product.name}</p>
                          <p className="text-[10px] text-[#7C6354] font-sans">/{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell font-sans text-[#7C6354]">
                      {product.fabric}
                    </td>
                    <td className="px-5 py-4 font-bold text-[#6A091A] text-sm">
                      ₹{product.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${product.in_stock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {product.in_stock ? 'IN STOCK' : 'SOLD OUT'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="p-1.5 rounded bg-[#FAF6EE] text-[#6A091A] border border-[#C59B27]/40 hover:bg-[#6A091A] hover:text-[#E8C86B]"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1.5 rounded bg-red-50 text-red-700 border border-red-200 hover:bg-red-700 hover:text-white"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditing && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="fixed inset-0 bg-[#38030B]/60 backdrop-blur-xs z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl bg-[#FAF6EE] border-2 border-[#C59B27] rounded-lg z-[70] p-6 shadow-2xl font-serif max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#C59B27]">
                <h2 className="font-serif text-lg font-bold text-[#6A091A] uppercase tracking-wider">
                  {editingId ? 'EDIT WEAVE SPECIFICATION' : 'NEW HANDLOOM PRODUCT'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="p-1 text-[#6A091A]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                <div className="sm:col-span-2">
                  <label className="font-serif font-bold text-[#7C6354] uppercase block mb-1">Product Title</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value, slug: autoSlug(e.target.value) })}
                    className="w-full px-3 py-2 rounded bg-[#FFFDF8] border border-[#C59B27]/40 text-sm"
                  />
                </div>
                <div>
                  <label className="font-serif font-bold text-[#7C6354] uppercase block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#FFFDF8] border border-[#C59B27]/40 text-sm"
                  />
                </div>
                <div>
                  <label className="font-serif font-bold text-[#7C6354] uppercase block mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={form.mrp}
                    onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#FFFDF8] border border-[#C59B27]/40 text-sm"
                  />
                </div>
                <div>
                  <label className="font-serif font-bold text-[#7C6354] uppercase block mb-1">Fabric</label>
                  <select
                    value={form.fabric}
                    onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#FFFDF8] border border-[#C59B27]/40 text-sm"
                  >
                    {['Silk', 'Cotton', 'Georgette', 'Linen', 'Crepe', 'Tussar Silk', 'Chiffon', 'Kanjivaram Silk'].map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-serif font-bold text-[#7C6354] uppercase block mb-1">Color</label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#FFFDF8] border border-[#C59B27]/40 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={handleSave} className="btn-maroon-gold flex-1 py-3 rounded-full text-xs font-bold uppercase">
                  SAVE PRODUCT
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
