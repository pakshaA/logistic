'use client'
import { store } from '@/redux/store';
import {Main} from '../components/main/main/main'
import { Provider } from 'react-redux';


export default function Home() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
