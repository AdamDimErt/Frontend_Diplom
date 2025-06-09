/** @format */

"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

///////////////////////
// 1. Типы интерфейсов
///////////////////////

interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
}

interface DeliveryAddress {
  city: string;
  street: string;
  floor: string;
  apartment: string;
}

// Цвет товаров: ключ — itemId, значение — выбранный цвет
type ItemColors = Record<string, string>;

// Возможные методы оплаты — только TON и Stripe
export type PaymentMethod = "ton" | "stripe";

//////////////////////////////////
// 2. Тип контекста (всё состояние)
//////////////////////////////////

export interface CheckoutContextType {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;

  deliveryAddress: DeliveryAddress;
  setDeliveryAddress: (addr: DeliveryAddress) => void;

  itemColors: ItemColors;
  setItemColor: (itemId: string, color: string) => void;

  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
}

///////////////////////////
// 3. Значения по умолчанию
///////////////////////////

const defaultContactInfo: ContactInfo = {
  fullName: "",
  phone: "",
  email: "",
};

const defaultDeliveryAddress: DeliveryAddress = {
  city: "",
  street: "",
  floor: "",
  apartment: "",
};

const defaultItemColors: ItemColors = {};

// По умолчанию платёж — через TON
const defaultPaymentMethod: PaymentMethod = "ton";

////////////////////
// 4. Создаём Context
////////////////////

const CheckoutContext =
  createContext<CheckoutContextType | null>(null);

////////////////////////////////////
// 5. Провайдер: обёртка над приложением
////////////////////////////////////

export const CheckoutProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [contactInfo, setContactInfo] =
    useState<ContactInfo>(defaultContactInfo);
  const [deliveryAddress, setDeliveryAddress] =
    useState<DeliveryAddress>(defaultDeliveryAddress);
  const [itemColors, setItemColors] = useState<ItemColors>(
    defaultItemColors,
  );
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>(defaultPaymentMethod);

  const setItemColor = (itemId: string, color: string) => {
    setItemColors((prev) => ({ ...prev, [itemId]: color }));
  };

  return (
    <CheckoutContext.Provider
      value={{
        contactInfo,
        setContactInfo,
        deliveryAddress,
        setDeliveryAddress,
        itemColors,
        setItemColor,
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

////////////////////////////////////
// 6. Хук для доступа к контексту
////////////////////////////////////

export const useCheckout = (): CheckoutContextType => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error(
      "useCheckout must be used within a CheckoutProvider",
    );
  }
  return ctx;
};
