import { create } from 'zustand';

export const usePaymentStore = create<{
  payment: 'account' | 'card';
  pickedAccount: () => void;
  pickedCard: () => void;
}>((set) => ({
  payment: 'account',
  pickedAccount: () => set({ payment: 'account' }),
  pickedCard: () => set({ payment: 'card' }),
}));
