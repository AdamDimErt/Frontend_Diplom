/** @format */
// src/app/admin/products/[id]/edit/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import axiosInstance from "@/shared/api/axiosInstance";

import {
  getBrands,
  IBrand,
} from "@/entities/brand/api/brandApi";
import {
  getCategories,
  ICategory,
} from "@/entities/category/api/categoryApi";
import {
  getColors,
  IColorItem,
} from "@/entities/color/api/colorApi";
import { Product } from "@/entities/product/model/types";

import styles from "./EditProduct.module.css";

const LANGS = ["RU", "EN", "KZ"] as const;
type Lang = (typeof LANGS)[number];

type Translation = {
  language: Lang;
  title: string;
  description: string;
};

type Spec = { translations: Translation[] };

type FormValues = {
  priceTenge: number;
  quantity: number;
  brandId: string;
  categoryId: string;
  colorIds: string[];
  translations: Translation[];
  specifications: Spec[];
  newImages?: File[];
};

export default function AdminProductEditPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const qc = useQueryClient();

  // 1) Подгружаем товар
  const { data: product, isLoading: loadingProduct } =
    useQuery<Product>({
      queryKey: ["product", id],
      queryFn: () =>
        axiosInstance
          .get<Product>(`/products/${id}`)
          .then((r) => r.data),
    });

  // 2) Подгружаем справочники
  const { data: brands = [] } = useQuery<IBrand[]>({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
  const { data: categories = [] } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const { data: colors = [] } = useQuery<IColorItem[]>({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  // 3) Настраиваем форму
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      priceTenge: 0,
      quantity: 0,
      brandId: "",
      categoryId: "",
      colorIds: [],
      translations: LANGS.map((l) => ({
        language: l,
        title: "",
        description: "",
      })),
      specifications: [],
    },
  });
  const translationsArray = useFieldArray({
    name: "translations",
    control,
  });
  const specsArray = useFieldArray({
    name: "specifications",
    control,
  });

  // для превью изображений
  const [preview, setPreview] = useState<string[]>([]);
  const newImages = watch("newImages");

  // 4) Когда товар подгрузится — заполняем форму и превью
  useEffect(() => {
    if (!product) return;
    reset({
      priceTenge: product.priceTenge,
      quantity: product.quantity,
      brandId: product.brand?.id ?? "",
      categoryId: product.category?.id ?? "",
      colorIds: product.colors.map((c: any) => c.id),
      translations: product.translations.map((tr) => ({
        language: tr.language as Lang,
        title: tr.title,
        description: tr.description,
      })),
      specifications: product.specifications?.map(
        (spec) => ({
          translations: spec.translations.map((tr) => ({
            language: tr.language as Lang,
            title: tr.name,
            description: tr.value,
          })),
        }),
      ),
    });
    setPreview(product.images);
  }, [product, reset]);

  // 5) Обработка выбора новых файлов
  const onFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setValue("newImages", files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreview((prev) => [...prev, ...urls]);
  };

  // удаление превью по индексу
  const removePreview = (idx: number) => {
    setPreview((p) => p.filter((_, i) => i !== idx));
    const imgs = watch("newImages") ?? [];
    setValue(
      "newImages",
      imgs.filter((_, i) => i !== idx),
    );
  };

  // 6) Мутация обновления
  const updateMutation = useMutation({
    mutationFn: (data: FormValues) => {
      const form = new FormData();
      form.append("priceTenge", data.priceTenge.toString());
      form.append("quantity", data.quantity.toString());
      form.append(
        "brand",
        JSON.stringify({ connect: { id: data.brandId } }),
      );
      form.append(
        "category",
        JSON.stringify({
          connect: { id: data.categoryId },
        }),
      );
      form.append(
        "colors",
        JSON.stringify({
          connect: data.colorIds.map((id) => ({ id })),
        }),
      );
      form.append(
        "translations",
        JSON.stringify(data.translations),
      );
      form.append(
        "specifications",
        JSON.stringify(data.specifications),
      );
      data.newImages?.forEach((file) =>
        form.append("images", file),
      );
      return axiosInstance.put(`/products/${id}`, form);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      // router.push("/admin/products");
    },
  });

  const onSubmit = (data: FormValues) =>
    updateMutation.mutate(data);

  if (loadingProduct) return <p>Загрузка товара…</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        ✏️ Редактировать товар
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <div className={styles.row}>
          <label>
            Цена, ₸
            <input
              type='number'
              {...register("priceTenge", {
                valueAsNumber: true,
              })}
            />
          </label>
          <label>
            Количество
            <input
              type='number'
              {...register("quantity", {
                valueAsNumber: true,
              })}
            />
          </label>
        </div>

        <div className={styles.row}>
          <label>
            Бренд
            <select {...register("brandId")}>
              <option value=''>—</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Категория
            <select {...register("categoryId")}>
              <option value=''>—</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className={styles.fullRow}>
          Цвета
          <select
            {...register("colorIds")}
            multiple
            className={styles.multi}
          >
            {colors.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <fieldset className={styles.fullRow}>
          <legend>Переводы</legend>
          {translationsArray.fields.map((tr, i) => (
            <div key={tr.id} className={styles.langBlock}>
              <strong>{tr.language}</strong>
              <input
                placeholder='Заголовок'
                {...register(
                  `translations.${i}.title` as const,
                )}
              />
              <textarea
                placeholder='Описание'
                {...register(
                  `translations.${i}.description` as const,
                )}
              />
            </div>
          ))}
        </fieldset>

        <fieldset className={styles.fullRow}>
          <legend>Спецификации</legend>
          {specsArray.fields.map((sp, i) => (
            <div key={sp.id} className={styles.specBlock}>
              <h5>Спецификация #{i + 1}</h5>
              {translationsArray.fields.map((tr, j) => (
                <div key={j} className={styles.langBlock}>
                  <label>{tr.language}</label>
                  <input
                    placeholder='Название'
                    {...register(
                      `specifications.${i}.translations.${j}.title` as const,
                    )}
                  />
                  <input
                    placeholder='Значение'
                    {...register(
                      `specifications.${i}.translations.${j}.description` as const,
                    )}
                  />
                </div>
              ))}
              <button
                type='button'
                onClick={() => specsArray.remove(i)}
                className={styles.removeSpec}
              >
                Удалить
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={() =>
              specsArray.append({
                translations: LANGS.map((l) => ({
                  language: l,
                  title: "",
                  description: "",
                })),
              })
            }
          >
            + Добавить спецификацию
          </button>
        </fieldset>

        <div className={styles.fullRow}>
          <label className={styles.uploadBtn}>
            Загрузить фото
            <input
              type='file'
              multiple
              accept='image/*'
              onChange={onFilesChange}
            />
          </label>
          <div className={styles.previews}>
            {preview.map((src, idx) => (
              <div key={idx} className={styles.previewItem}>
                <img src={src} alt='' />
                <button
                  type='button'
                  onClick={() => removePreview(idx)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type='submit'
          className={styles.submit}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending
            ? "Сохраняем…"
            : "Сохранить"}
        </button>
      </form>
    </div>
  );
}
