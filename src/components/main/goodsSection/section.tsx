'use client'

import { useState } from 'react'
import { Checkbox } from "@mui/material"
import Style from './section.module.scss'
import { useDispatch } from 'react-redux'
import { setGoods } from '@/redux/slices'
import { ProductSelector } from './select/select'

export const GoodsSection = () => {
  const dispatch = useDispatch()
  const label = { inputProps: { 'aria-label': 'Перевозка продуктов' } };
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    dispatch(setGoods(checked)); 
  }

  return (
    <div className={Style.wrapper}>
      <div className={Style['wrapper_chekbox']}>
        <Checkbox
          {...label}
          checked={isChecked}
          onChange={handleChange}
        />
        <p>Перевозка продуктов</p>
      </div>
      {isChecked && 
        <div className={Style['wrapper_select']}>
            <ProductSelector />
        </div>
      }
    </div>
  );
};
