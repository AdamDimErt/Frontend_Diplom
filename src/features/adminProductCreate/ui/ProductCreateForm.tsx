/** @format */
"use client";

import {
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useQuery } from "@tanstack/react-query";

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

import styles from "./ProductCreateForm.module.css";

const LANGS = ["RU", "EN", "KZ"] as const;

type Translation = {
  language: (typeof LANGS)[number];
  title: string;
  description: string;
};

type SpecTranslation = {
  language: (typeof LANGS)[number];
  name: string;
  value: string;
};

type Spec = {
  translations: SpecTranslation[];
};

type FormValues = {
  priceTenge: number;
  quantity: number;
  brandId: string;
  categoryId: string;
  colorIds: string[];
  translations: Translation[];
  specifications: Spec[];
  images: FileList;
};

type Option = { value: string; label: string };

export default function ProductCreateForm() {
  const { register, handleSubmit, control, reset } =
    useForm<FormValues>({
      defaultValues: {
        priceTenge: 0,
        quantity: 0,
        brandId: "",
        categoryId: "",
        colorIds: [],
        translations: LANGS.map((lang) => ({
          language: lang,
          title: "",
          description: "",
        })),
        specifications: [],
        images: undefined as any,
      },
    });

  const createProduct = useCreateProduct();

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

  const translationsArray = useFieldArray({
    control,
    name: "translations",
  });
  const specsArray = useFieldArray({
    control,
    name: "specifications",
  });

  const onSubmit = (data: FormValues) => {
    const form = new FormData();
    form.append("priceTenge", String(data.priceTenge));
    form.append("quantity", String(data.quantity));
    form.append(
      "brand",
      JSON.stringify({ connect: { id: data.brandId } }),
    );
    form.append(
      "category",
      JSON.stringify({ connect: { id: data.categoryId } }),
    );
    form.append(
      "translations",
      JSON.stringify(data.translations),
    );
    form.append(
      "specifications",
      JSON.stringify(data.specifications),
    );
    form.append(
      "colors",
      JSON.stringify({
        connect: data.colorIds.map((id) => ({ id })),
      }),
    );
    Array.from(data.images || []).forEach((file) =>
      form.append("images", file),
    );

    createProduct.mutate(form);
    reset();
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Цена и количество */}
      <label>
        Цена, ₸
        <input
          type='number'
          {...register("priceTenge", { required: true })}
        />
      </label>
      <label>
        Количество
        <input
          type='number'
          {...register("quantity", { required: true })}
        />
      </label>

      {/* Бренд */}
      <label>
        Бренд
        <select
          {...register("brandId", { required: true })}
        >
          <option value=''>— Выберите бренд —</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </label>

      {/* Категория */}
      <label>
        Категория
        <select
          {...register("categoryId", { required: true })}
        >
          <option value=''>— Выберите категорию —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      {/* Цвета — мультивыбор через react-select */}
      <label>
        Цвета
        <Controller<FormValues, "colorIds">
          name='colorIds'
          control={control}
          render={({ field }) => {
            // приводим к string[]
            const selected = Array.isArray(field.value)
              ? field.value.filter(
                  (v): v is string => typeof v === "string",
                )
              : [];

            const options: any = colors.map((c) => ({
              value: c.id,
              label: c.label,
            }));

            // value для react-select
            const value = options.filter((o:any) =>
              selected.includes(o.value),
            );

            return (
              <Select<Option, true>
                {...field}
                options={options}
                isMulti
                className={styles.reactSelect}
                classNamePrefix='rs'
                onChange={(selected: MultiValue<Option>) =>
                  field.onChange(
                    selected.map((o) => o.value),
                  )
                }
                value={value}
              />
            );
          }}
        />
      </label>

      {/* Переводы */}
      <fieldset className={styles.fieldset}>
        <legend>Переводы</legend>
        {translationsArray.fields.map((tr, i) => (
          <div key={tr.id} className={styles.langBlock}>
            <h4>{tr.language}</h4>
            <label>
              Название
              <input
                {...register(
                  `translations.${i}.title` as const,
                  { required: true },
                )}
              />
            </label>
            <label>
              Описание
              <textarea
                {...register(
                  `translations.${i}.description` as const,
                  { required: true },
                )}
                rows={2}
              />
            </label>
          </div>
        ))}
      </fieldset>

      {/* Спецификации */}
      <fieldset className={styles.fieldset}>
        <legend>Спецификации</legend>
        {specsArray.fields.map((spec, idx) => (
          <div key={spec.id} className={styles.specBlock}>
            <h5>Спецификация #{idx + 1}</h5>
            {LANGS.map((lang, j) => (
              <div key={lang} className={styles.langBlock}>
                <h6>{lang}</h6>
                <label>
                  Название
                  <input
                    {...register(
                      `specifications.${idx}.translations.${j}.name` as const,
                      { required: true },
                    )}
                  />
                </label>
                <label>
                  Значение
                  <input
                    {...register(
                      `specifications.${idx}.translations.${j}.value` as const,
                      { required: true },
                    )}
                  />
                </label>
              </div>
            ))}
            <button
              type='button'
              onClick={() => specsArray.remove(idx)}
            >
              Удалить спецификацию
            </button>
          </div>
        ))}
        <button
          type='button'
          onClick={() =>
            specsArray.append({
              translations: LANGS.map((language) => ({
                language,
                name: "",
                value: "",
              })),
            })
          }
        >
          + Добавить спецификацию
        </button>
      </fieldset>

      {/* Изображения */}
      <label>
        Изображения
        <input
          type='file'
          {...register("images", { required: true })}
          multiple
          accept='image/*'
        />
      </label>

      {/* Сохранить */}
      <button
        type='submit'
        disabled={createProduct.isPending}
      >
        {createProduct.isPending
          ? "Сохраняем…"
          : "Создать продукт"}
      </button>
    </form>
  );
}
