'use client';

import { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setTypeOfGoods, clearTypeOfGoods } from '@/redux/slices';

interface ProductType {
  id: string;
  label: string;
  shelfLifeDays: number;
}

const productTypes: ProductType[] = [
  { id: 'perishable', label: 'Скоропортящиеся', shelfLifeDays: 3 },
  { id: 'frozen', label: 'Замороженные', shelfLifeDays: 30 },
  { id: 'non_perishable', label: 'Нескоропортящиеся', shelfLifeDays: 180 },
  { id: 'fresh', label: 'Свежие продукты', shelfLifeDays: 7 },
  { id: 'bakery', label: 'Выпечка', shelfLifeDays: 2 },
];

export const ProductSelector = () => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  useEffect(() => {
    return () => {
      dispatch(clearTypeOfGoods())
    }
  }, [])
  useEffect(() => {
    dispatch(setTypeOfGoods(selectedType?.id || ''))
  }, [selectedType])
  return (
      <Box display="flex" flexDirection="column" gap={2} maxWidth={300}>
        <FormControl fullWidth>
          <InputLabel id="product-type-label">Тип продукта</InputLabel>
          <Select
            labelId="product-type-label"
            value={selectedType?.id || ''}
            label="Тип продукта"
            onChange={(e) => {
              const type = productTypes.find((pt) => pt.id === e.target.value) || null;
              setSelectedType(type);
            }}
          >
            {productTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <span>{type.label}</span>
                  <span>{type.shelfLifeDays} дней</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
  );
};