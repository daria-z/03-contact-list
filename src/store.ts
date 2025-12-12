import { create, StateCreator } from 'zustand'


interface Contact {
  id: string,
  name: string,
  position: string,
  phone: string
}

type ContactsByLetter = {
  [letter: string]: Contact[]
}

interface Actions {
  addContact: () => void,
  deleteContact: (id: string) => void,
  editContact: (id: string) => void
}

interface InitialState {
  contacts: ContactsByLetter | null;
}

interface ContactsState extends Actions, InitialState {}

const initialState: InitialState = {
  contacts: null
}

const contadtsState: StateCreator<ContactsState> = (set) => ({
  ...initialState,
  addContact: () => void,
  deleteContact: (id: string) => void,
  editContact: (id: string) => void
})
