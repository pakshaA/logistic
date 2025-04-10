import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
  departure: {
    name: string;
    id: number;
  };
  destination: {
    name: string;
    id: number;
  };
}

interface PackageState {
  package: {
    width: string;
    height: string;
    length: string;
    weight: string;
    id: string
  };
  isGoods: boolean;
  typeOfGoods: string;
}

interface InfoItem {
  date: string;
  addressFrom: string;
  phoneFrom: string;
  addressTo: string;
  phoneTo: string;
}

const initialInfoState: Array<InfoItem> = [];

const initialState: CityState = {
  departure: { name: '', id: 0 },
  destination: { name: '', id: 0 },
};

const initialPackageState: PackageState = {
  package: { width: '', height: '', length: '', weight: '' , id: ''},
  isGoods: false,
  typeOfGoods: '',
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setDepartureCity: (state, action: PayloadAction<{ name: string; id: number }>) => {
      state.departure = action.payload;
    },
    setDestinationCity: (state, action: PayloadAction<{ name: string; id: number }>) => {
      state.destination = action.payload;
    },
    setDepartureCityClear: (state) => {
      state.departure = {name: '', id: 0};
    },
    setDestinationCityClear: (state) => {
      state.destination = {name: '', id: 0};
    }
  },
});

export const packageSlice = createSlice({
  name: 'package',
  initialState: initialPackageState,
  reducers: {
    setTypeOfGoods: (state, action: PayloadAction<string>) => {
      state.typeOfGoods = action.payload;
    },
    clearTypeOfGoods: (state) => {
      state.typeOfGoods = "";
    },
    setGoods: (state, action: PayloadAction<boolean>) => {
      state.isGoods = action.payload;
    },
    setPackage: (state, action: PayloadAction<{ width: string; height: string; length: string; weight: string, id: string }>) => {
      state.package = action.payload;
    },
    setPackageClear: (state) => {
      state.package = { width: '', height: '', length: '', weight: '', id: '' };
    }
  },
});

export const infoSlice = createSlice({
  name: 'info',
  initialState: initialInfoState,
  reducers: {
    addInfo: (state, action: PayloadAction<InfoItem>) => {
      state.push(action.payload);
    },
    clearInfo: () => {
      return [];
    },
    removeInfo: (state, action: PayloadAction<number>) => {
      return state.filter((_, index) => index !== action.payload);
    },
    loadFromCookies: (state, action: PayloadAction<InfoItem[]>) => {
      return action.payload;
    },
  }
})

export const { addInfo, clearInfo, loadFromCookies } = infoSlice.actions;
export const infoReducer = infoSlice.reducer;

export const { setPackage, setPackageClear, setGoods, setTypeOfGoods, clearTypeOfGoods } = packageSlice.actions;
export const packageReducer = packageSlice.reducer;

export const { setDepartureCity, setDestinationCity, setDepartureCityClear, setDestinationCityClear } = citySlice.actions;
export const cityReducer = citySlice.reducer;
