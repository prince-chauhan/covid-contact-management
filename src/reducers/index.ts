import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';

interface ContactsState {
  value: Contact[];
}

const initialState: ContactsState = { value: [] };

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.value.push(action.payload);
      state.value.map((val)=>console.log(val))
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(contact => contact.id !== action.payload);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.value.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addContact, deleteContact, editContact } = contactsSlice.actions;

export default contactsSlice.reducer;
