'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogIn,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Package,
  ShieldCheck,
} from 'lucide-react';
import { supabase, Product, isSupabaseConfigured } from '@/lib/supabase';
import { mockProducts } from '@/lib/mockData';

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
    // Check if supabase is configured
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    setSupabaseConfigured(!!url && url.length > 0);

    // Check existing session
    const checkSession = async () => {
      if (!url || url.length === 0) {
        // Use mock data when supabase isn't configured
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
      // Demo mode login
      if (email === 'admin@demo.com' && password === 'admin123') {
        setIsAuthenticated(true);
        setProducts(mockProducts);
      } else {
        setAuthError('Demo credentials: admin@demo.com / admin123');
      }
      setAuthLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

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
      // Demo mode: just close the editor
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
      <div className="min-h-[80vh] flex items-center justify-center px-4 page-enter">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-[var(--color-gold)]" />
              </div>
              <h1 className="font-display text-2xl font-bold text-[var(--color-cream)]">
                Admin Login
              </h1>
              <p className="text-sm text-[var(--color-text-dim)] mt-2">
                Sign in to manage your product catalog
              </p>
              {!supabaseConfigured && (
                <p className="text-xs text-[var(--color-gold)] mt-3 p-2 rounded-lg bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/10">
                  Demo Mode — Use admin@demo.com / admin123
                </p>
              )}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                />
              </div>

              {authError && (
                <p className="text-sm text-red-400 bg-red-900/20 rounded-lg p-3">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="btn-gold w-full flex items-center justify-center gap-2 text-sm"
              >
                <LogIn className="w-4 h-4" />
                {authLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="page-enter">
      {/* Header */}
      <section className="py-8 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-cream)]">
              Admin <span className="text-gradient-gold">Dashboard</span>
            </h1>
            <p className="text-sm text-[var(--color-text-dim)] mt-1">
              {products.length} products in catalog
              {!supabaseConfigured && ' (Demo Mode)'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={startCreate} className="btn-gold text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Product</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-red-500/30 transition-colors group"
            >
              <LogOut className="w-4 h-4 text-[var(--color-text-dim)] group-hover:text-red-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Editor Modal */}
      <AnimatePresence>
        {isEditing && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:max-h-[85vh] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl z-[70] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-[var(--color-cream)]">
                    {editingId ? 'Edit Product' : 'New Product'}
                  </h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-2 rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors"
                  >
                    <X className="w-5 h-5 text-[var(--color-text-muted)]" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          name: e.target.value,
                          slug: autoSlug(e.target.value),
                        });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                      MRP (₹)
                    </label>
                    <input
                      type="number"
                      value={form.mrp}
                      onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                      Fabric
                    </label>
                    <select
                      value={form.fabric}
                      onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                    >
                      {['Silk', 'Cotton', 'Georgette', 'Linen', 'Crepe', 'Tussar Silk', 'Chiffon'].map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                      Color
                    </label>
                    <input
                      type="text"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                      Occasion
                    </label>
                    <select
                      value={form.occasion}
                      onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                    >
                      {['Wedding', 'Festival', 'Casual', 'Party', 'Office', 'Traditional'].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                      Region
                    </label>
                    <input
                      type="text"
                      value={form.region}
                      onChange={(e) => setForm({ ...form, region: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5 block">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-cream)] focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.in_stock}
                        onChange={(e) => setForm({ ...form, in_stock: e.target.checked })}
                        className="accent-[var(--color-gold)]"
                      />
                      <span className="text-sm text-[var(--color-text-muted)]">In Stock</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="accent-[var(--color-gold)]"
                      />
                      <span className="text-sm text-[var(--color-text-muted)]">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={handleSave} className="btn-gold flex-1 flex items-center justify-center gap-2 text-sm">
                    <Save className="w-4 h-4" />
                    {editingId ? 'Update' : 'Create'} Product
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-outline px-6 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Products Table */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left px-5 py-4 font-display text-xs text-[var(--color-text-dim)] uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-5 py-4 font-display text-xs text-[var(--color-text-dim)] uppercase tracking-wider hidden sm:table-cell">
                      Fabric
                    </th>
                    <th className="text-left px-5 py-4 font-display text-xs text-[var(--color-text-dim)] uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-left px-5 py-4 font-display text-xs text-[var(--color-text-dim)] uppercase tracking-wider hidden md:table-cell">
                      Status
                    </th>
                    <th className="text-right px-5 py-4 font-display text-xs text-[var(--color-text-dim)] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-bg-elevated)]/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-elevated)] flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-[var(--color-gold)]" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[var(--color-cream)] truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-[var(--color-text-dim)] truncate">
                              /{product.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="chip text-xs">{product.fabric}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-semibold text-[var(--color-gold)]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`}
                          />
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {product.in_stock ? 'In Stock' : 'Sold Out'}
                          </span>
                          {product.featured && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)]">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => startEdit(product)}
                            className="p-2 rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors group"
                          >
                            <Pencil className="w-4 h-4 text-[var(--color-text-dim)] group-hover:text-[var(--color-gold)]" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 rounded-lg hover:bg-red-900/30 transition-colors group"
                          >
                            <Trash2 className="w-4 h-4 text-[var(--color-text-dim)] group-hover:text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
