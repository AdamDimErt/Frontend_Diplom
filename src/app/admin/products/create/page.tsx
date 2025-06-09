// src/app/admin/products/create/page.tsx
'use client';

import ProductCreateForm from '@/features/adminProductCreate/ui/ProductCreateForm';

export default function AdminProductCreatePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>➕ Создать новый продукт</h1>
      <ProductCreateForm />
    </div>
  );
}
