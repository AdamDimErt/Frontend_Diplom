/** @format */

// src/features/checkout/address/AddressForm.tsx

"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import styles from "./AddressForm.module.css";
import { useCheckout } from "../model/useCheckout";

// Zod-схема для контактов + адреса
const addressSchema = z.object({
  fullName: z.string().min(2, { message: "errorRequired" }),
  phone: z.string().min(5, { message: "errorRequired" }),
  email: z.string().email({ message: "errorInvalidEmail" }),
  city: z.string().min(1, { message: "errorRequired" }),
  street: z.string().min(1, { message: "errorRequired" }),
  floor: z.string().min(1, { message: "errorRequired" }),
  apartment: z
    .string()
    .min(1, { message: "errorRequired" }),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export const AddressForm: React.FC = () => {
  const t = useTranslations("checkout");
  const router = useRouter();
  const {
    contactInfo,
    setContactInfo,
    deliveryAddress,
    setDeliveryAddress,
  } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: contactInfo.fullName,
      phone: contactInfo.phone,
      email: contactInfo.email,
      city: deliveryAddress.city,
      street: deliveryAddress.street,
      floor: deliveryAddress.floor,
      apartment: deliveryAddress.apartment,
    },
  });

  useEffect(() => {
    const sub = watch(() => {
      // Если нужно сбрасывать какие-то общие ошибки, сюда
    });
    return () => sub.unsubscribe();
  }, [watch]);

  const onSubmit = (data: AddressFormValues) => {
    setContactInfo({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
    });
    setDeliveryAddress({
      city: data.city,
      street: data.street,
      floor: data.floor,
      apartment: data.apartment,
    });
    router.push("/orders/payment"); // следующий этап — страница оплаты
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* === Contact Info === */}
      <div className={styles.section}>
        <h3>{t("contactInfo")}</h3>

        <label className={styles.field}>
          <span>{t("fullName")}*</span>
          <input
            type='text'
            {...register("fullName")}
            className={styles.input}
          />
          {errors.fullName && (
            <p className={styles.error}>
              {t(errors.fullName.message as string)}
            </p>
          )}
        </label>

        <label className={styles.field}>
          <span>{t("phoneNumber")}*</span>
          <input
            type='text'
            {...register("phone")}
            className={styles.input}
          />
          {errors.phone && (
            <p className={styles.error}>
              {t(errors.phone.message as string)}
            </p>
          )}
        </label>

        <label className={styles.field}>
          <span>{t("email")}*</span>
          <input
            type='email'
            {...register("email")}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.error}>
              {t(errors.email.message as string)}
            </p>
          )}
        </label>
      </div>

      {/* === Delivery Address === */}
      <div className={styles.section}>
        <h3>{t("deliveryAddress")}</h3>

        <label className={styles.field}>
          <span>{t("city")}*</span>
          <input
            type='text'
            {...register("city")}
            className={styles.input}
          />
          {errors.city && (
            <p className={styles.error}>
              {t(errors.city.message as string)}
            </p>
          )}
        </label>

        <label className={styles.field}>
          <span>{t("street")}*</span>
          <input
            type='text'
            {...register("street")}
            className={styles.input}
          />
          {errors.street && (
            <p className={styles.error}>
              {t(errors.street.message as string)}
            </p>
          )}
        </label>

        <div className={styles.row}>
          <label
            className={`${styles.field} ${styles.half}`}
          >
            <span>{t("floor")}*</span>
            <input
              type='text'
              {...register("floor")}
              className={styles.input}
            />
            {errors.floor && (
              <p className={styles.error}>
                {t(errors.floor.message as string)}
              </p>
            )}
          </label>

          <label
            className={`${styles.field} ${styles.half}`}
          >
            <span>{t("apartment")}*</span>
            <input
              type='text'
              {...register("apartment")}
              className={styles.input}
            />
            {errors.apartment && (
              <p className={styles.error}>
                {t(errors.apartment.message as string)}
              </p>
            )}
          </label>
        </div>
      </div>

      <button type='submit' className={styles.submitButton}>
        {t("order")}
      </button>
    </form>
  );
};
