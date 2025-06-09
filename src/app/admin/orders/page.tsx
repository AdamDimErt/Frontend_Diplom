/** @format */
// Список заказов — только чтение
"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "@/entities/order/api/orderApi";
import { AdminTable } from "@/features/adminProductCreate/ui/AdminTable";

type OrderItem = {
  id: string;
  product: { translations: { title: string }[] };
  quantity: number;
};
type Order = {
  id: string;
  shippingAddress: string;
  amountTon: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function AdminOrdersPage() {
  const { data: orders = [], isLoading } = useQuery<
    Order[]
  >({
    queryKey: ["adminOrders"],
    queryFn: getMyOrders,
  });

  if (isLoading) return <p>Загрузка заказов…</p>;

  return (
    <div>
      <h1>📦 Список заказов</h1>
      <AdminTable<Order>
        columns={[
          { header: "ID", accessor: "id" },
          { header: "Адрес", accessor: "shippingAddress" },
          { header: "Тонны", accessor: "amountTon" },
          { header: "Статус", accessor: "status" },
          { header: "Дата", accessor: "createdAt" },
          {
            header: "Товары",
            accessor: "items",
            cell: (items: any) =>
              items.map((i:any) => (
                <div key={i.id}>
                  {i.product.translations[0]?.title} ×{" "}
                  {i.quantity}
                </div>
              )),
          },
        ]}
        data={orders}
      />
    </div>
  );
}
