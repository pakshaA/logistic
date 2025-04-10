'use client'
import Style from './sum.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { FormEvent, useState } from 'react'
import getDistanceByAir from '@/api/getDistance'
import { getPrice } from '@/api/getPrice'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { DialogTitle } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { addInfo, clearInfo } from '@/redux/slices'

interface Info {
  date: string;
  addressFrom: string;
  phoneFrom: string;
  addressTo: string
  phoneTo: string
}

export const Sum = () => {
    const [ isClicked, setIsClicked ] = useState<boolean>(false)
    const [ distance, setDistance ] = useState<number | null>(null)
    const [ price, setPrice ] = useState<number | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [info, setInfo] = useState<Info>({date: '', addressFrom: "", phoneFrom: "", addressTo: "", phoneTo: ""})
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
    const dispatch = useDispatch()

    const cityFrom = useSelector((state: RootState) => state.city.departure.name);
    const cityTo = useSelector((state: RootState) => state.city.destination.name);
    const packageInfo = useSelector((state: RootState) => state.package);
    
    const getInfo = () => {
      if (!cityFrom || !cityTo || !packageInfo.package) {
        alert('Заполните все поля');
        return null;
      }
    
      return { cityFrom, cityTo, packageInfo };
    };
    
    const handleClick = async () => {
      const info = getInfo();
      if (info) {
        try {
            const distance = await getDistanceByAir(info.cityFrom, info.cityTo);
            console.log(distance)
            const km = Math.round(distance)
            setDistance(km);
            const price = await getPrice(km, packageInfo)
            setPrice(price)
            setIsClicked(true);
        } catch (error) {
          console.error('Ошибка при расчете расстояния:', error);
        }
      }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Важно: предотвращаем перезагрузку страницы
        if (!info.addressFrom || !info.addressTo || !info.phoneFrom || !info.phoneTo) return alert("Заполните все поля")
        if (!selectedDate) {
            alert('Выберите дату отправления');
            return;
        }

        const formData = {
            ...info,
            date: selectedDate.format('YYYY-MM-DD'),
        };

        dispatch(addInfo(formData));
        console.log('Сохраненные данные:', formData);
        setOpen(false);
        setInfo({  // Очистка формы
            date: '',
            addressFrom: "",
            phoneFrom: "",
            addressTo: "",
            phoneTo: ""
        });
    };

    // Обновляем обработчик даты
    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate);
        if (newDate) {
            setInfo(prev => ({
                ...prev,
                date: newDate.format('YYYY-MM-DD')
            }));
        }
    };

    return (
        <div className={Style.wrapper}>
            <div className={Style.button} onClick={handleClick}>
                Расчитать
            </div>
            { isClicked && 
              <>
                <div className={Style.info}>
                    <div>
                        <p className={Style.cities}>Из города {cityFrom} в город {cityTo}</p>
                        <p className={Style.packageInfo}>Посылка размерами {packageInfo.package.height} X {packageInfo.package.width} X {packageInfo.package.length} см, весом до {packageInfo.package.weight} кг</p>
                        <p className={Style.typeOfGoods}>{packageInfo.isGoods ? 'Перевозка продуктов' : 'Перевозка товаров'}</p>
                        <p className={Style.price}>Стоимость: {price} руб.</p>
                    </div>
                </div>
                <div className={Style.button} style={{marginTop: 30}} onClick={() => setOpen(true)}>
                  Оформить заказ
                </div>
                <Dialog open={open} onClose={() => setOpen(false)}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <form onSubmit={handleSubmit}>
                    <DialogTitle>Добавить достижение</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Введите информацию о вашем достижении
                      </DialogContentText>

                      <DatePicker
                        label="Дата отправления"
                        value={selectedDate}
                        onChange={handleDateChange}
                        format="DD.MM.YYYY"
                        sx={{ mt: 2, mb: 2, width: '100%' }}
                      />
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Адрес отправления"
                        fullWidth
                        variant="outlined"
                        value={info.addressFrom}
                        onChange={(e) => setInfo(prev => ({...prev, addressFrom: e.target.value}))}
                        multiline
                        rows={2}
                      />
                      <TextField
                        required
                        margin="dense"
                        label="Телефон отправителя"
                        fullWidth
                        variant="outlined"
                        value={info.phoneFrom}
                        onChange={(e) => setInfo(prev => ({...prev, phoneFrom: e.target.value}))}
                        rows={1}
                      />
                      <TextField
                        required
                        margin="dense"
                        label="Адрес получения"
                        fullWidth
                        variant="outlined"
                        value={info.addressTo}
                        onChange={(e) => setInfo(prev => ({...prev, addressTo: e.target.value}))}
                        multiline
                        rows={2}
                      />
                      <TextField
                        required
                        margin="dense"
                        label="Телефон получателя"
                        fullWidth
                        variant="outlined"
                        value={info.phoneTo}
                        onChange={(e) => setInfo(prev => ({...prev, phoneTo: e.target.value}))}
                        rows={1}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpen(false)}>Отмена</Button>
                      <Button type="submit" variant="contained" color="primary">
                        Сохранить
                      </Button>
                    </DialogActions>
                  </form>
                </LocalizationProvider>
              </Dialog>
              </>
            }
        </div>
    )
}
