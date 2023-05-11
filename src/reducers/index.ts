import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';

// defines an interface ContactsState with a value property of type Contact[]
interface ContactsState {
  value: Contact[];
}

//  initializes the initialState for the ContactsState, setting the value property as an empty array
const initialState: ContactsState = { value: [] }; 

// creates a redux slice using the createSlice function, it define three reducers: addContact, deleteContact, and editContact to perform actions
export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // addContact reducer adds a new contact to the state value array by pushing the action.payload to it
    addContact: (state, action: PayloadAction<Contact>) => {
      state.value.push(action.payload);
    },

    // deleteContact reducer removes a contact from the state value array by filtering out the contact with the specified action.payload (contact ID)
    deleteContact: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(contact => contact.id !== action.payload);
    },

    // similarly editContact reducer updates an existing contact in the state's value array it finds the index of the contact with the matching ID and replaces it with the action.payload
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.value.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
  },
});

// action creators are generated for each case reducer function
export const { addContact, deleteContact, editContact } = contactsSlice.actions;

export default contactsSlice.reducer;
