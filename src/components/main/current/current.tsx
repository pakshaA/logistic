import { RootState } from '@/redux/store';
import {useSelector} from 'react-redux'
import Style from './current.module.scss';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { loadFromCookies } from '@/redux/slices';

export const Current = () => {
    const info = useSelector((state: RootState) => state.info);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const savedOrders = Cookies.get('orders');
      if (savedOrders) {
        try {
          const parsed = JSON.parse(savedOrders);
          dispatch(loadFromCookies(parsed));
        } catch (e) {
          console.error('Error parsing cookies:', e);
        }
      }
    }, [dispatch]);
    
    useEffect(() => {
        Cookies.set('orders', JSON.stringify(info), { 
            expires: 7, // Хранить 7 дней
        });
    }, [info]);

    // Загрузка из куков при монтировании
    useEffect(() => {
        const savedOrders = Cookies.get('orders');
        if (savedOrders) {
            // Здесь можно диспатчить действие для загрузки в хранилище
            console.log('Loaded from cookies:', JSON.parse(savedOrders));
        }
    }, []);
    return (
        <div>
            {info.length !== 0 && 
                <div className={Style.section}>
                    <p className={Style.main_header}>Текущие заказы</p> 

                    {info.map((item, index) => (
                      <div key={index} className={Style.card}>
                        <p>Заказ №{Date.now()} от {item.date}</p>
                        <div className={Style.info}>
                            <div>
                                <p className={Style.header}>Адрес отправления</p>
                                <p>{item.addressFrom}</p>
                            </div>
                            <div>
                                <p className={Style.header}>Телефон отправителя</p>
                                <p>{item.phoneFrom}</p>
                            </div>
                            <div>
                                <p className={Style.header}>Адрес доставки</p>
                                <p>{item.addressTo}</p>
                            </div>
                            <div>
                                <p className={Style.header}>Телефон получателя</p>
                                <p>{item.phoneTo}</p>
                            </div>

                        </div>
                        <div className={Style.message}>Наш представитель скоро свяжется с вами по Вашему заказу.</div>
                      </div>
                    ))}
                </div>
            }
        </div>
    )
}