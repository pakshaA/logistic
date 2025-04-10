'use client';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Style from './search.module.scss';
import { setDepartureCity, setDepartureCityClear, setDestinationCity, setDestinationCityClear } from '@/redux/slices';
import { useDispatch } from 'react-redux';

interface City {
  name: string;
  id: number; 
}

interface SearchProps {
  data: {
    cities: City[];
  };
}

export const Search = ({ data }: SearchProps) => {
  const dispatch = useDispatch();
  const handleSelectCity = (city: City | null | string, id: string) => {
    if (city && typeof city !== 'string') {
      if (id === 'To') {
        dispatch(setDestinationCity(city));
      } else {
        dispatch(setDepartureCity(city));
      }
    } else {
      if (id === 'To') {
        dispatch(setDestinationCityClear());
      } else {
        dispatch(setDepartureCityClear());
      }
    }
  }

  return (
    <div className={Style.SearchContainer}>
        <div className={Style.wrapper}>
            <Autocomplete 
                className={Style.search}
                disablePortal
                options={data.cities}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: 350, height: 40 }}
                renderInput={(params) => <TextField {...params} label={"Откуда"} />}
                onChange={(event, value) => handleSelectCity(value, 'From')}
            />
        </div>
        <div className={Style.wrapper}>
            <Autocomplete 
                className={Style.search}
                disablePortal
                options={data.cities}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: 350, height: 40 }}
                renderInput={(params) => <TextField {...params} label={"Куда"} />}
                onChange={(event, value) => handleSelectCity(value, 'To')}
            />
        </div>
    </div>
  );
};
