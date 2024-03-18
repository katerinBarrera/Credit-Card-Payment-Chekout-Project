import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BasicInformation, CardInformation, CounterState } from '../../models/payment';

const getInitialState = (): CounterState => {
  const persistedStateJSON = localStorage.getItem('counterState');
  if (persistedStateJSON) {
    return JSON.parse(persistedStateJSON);
  }
  return {
    quantity: 1,
    fullValue: 150,
    deliveryCharges: 25,
    totalAmount: 0,
    userData: {
      basicInformation: {
        email: "",
        fullName: "",
      },
      cardInformation: {
        cardNumber: null,
        cardExpiration: "",
        cardCvv: null,
        cardName: "",
        typeId: "",
        idNumber: null,
        installments: null,
      },
    },
    stageProcess: "basicInformation",
    finalStatus: true,
  };
};



const initialState: CounterState = getInitialState();

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.quantity += 1;
      state.fullValue += 150;
      state.deliveryCharges += 25;
      persistState(state);
    },
    decrement: (state) => {
      state.quantity -= 1;
      state.fullValue -= 150;
      state.deliveryCharges += 25;
      persistState(state);
    },
    totalAmountValue: (state) => {
      state.totalAmount = state.fullValue + state.deliveryCharges;
      persistState(state);
    },
    setStageProcess: (state, action: PayloadAction<"basicInformation" | "cardInformation" | "summaryInformation" | "finalStatus">) => {
      state.stageProcess = action.payload;
      persistState(state);
    },
    setBasicInformationState: (state, action: PayloadAction<BasicInformation>) => {
      state.userData = {
        ...state.userData,
        basicInformation: { ...action.payload }
      };
      persistState(state);
    },
    setCardInformationState: (state, action: PayloadAction<CardInformation>) => {
      state.userData = {
        ...state.userData,
        cardInformation: { ...action.payload }
      };
      persistState(state);

    },
    setFinalStatus: (state, action: PayloadAction<boolean>) => {
      state.finalStatus = action.payload;
      persistState(state);
    }
  },
});

export const { increment, decrement, totalAmountValue, setBasicInformationState, setCardInformationState, setStageProcess, setFinalStatus } = counterSlice.actions;

export default counterSlice.reducer;

const persistState = (state: CounterState) => {
  localStorage.setItem('counterState', JSON.stringify(state));
};
