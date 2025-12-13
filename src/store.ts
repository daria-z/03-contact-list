import { create } from 'zustand';
import { nanoid } from 'nanoid';

const normalizeString = (str: string) => str.trim().toLowerCase();

export class DuplicateContactError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateContactError';
  }
}

const addContact = (list: ContactsByLetter | null, { name, position, phone}: Contact) => {
  const firstLetter = normalizeString(name).slice(0, 1);
  const contact = {
    id: nanoid(),
    name: normalizeString(name),
    position: normalizeString(position),
    phone: normalizeString(phone)
  };

  const updatedList = list ? { ...list } : {};

  if (Object.hasOwn(updatedList, firstLetter)) {
    if (updatedList[firstLetter].find((c) => c.name === name)) throw new DuplicateContactError(`Contact with name "${name}" already exists`);
    updatedList[firstLetter] = [...updatedList[firstLetter], contact];
  } else {
    updatedList[firstLetter] = [contact];
  }

  console.log('state', updatedList);

  return updatedList;
}

const deleteContact = (list: ContactsByLetter | null, { id, name }: DeleteContactParams) => {
  if (!list) return null;

  const firstLetter = normalizeString(name).slice(0, 1);

  const filteredLetterGroup = list[firstLetter].filter(c => c.id !== id);

  if (filteredLetterGroup.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [firstLetter]: _, ...rest } = list;
    return rest;
  }

  return { ...list, [firstLetter]: filteredLetterGroup };

}

const editContact = (list: ContactsByLetter | null, contact: Contact) => {
  if (!list) return null;

  const firstLetter = normalizeString(contact.name).slice(0, 1);

  const filteredGroup = list[firstLetter]?.filter(c => c.id !== contact.id) || [];
  const updatedGroup = [...filteredGroup, contact];

  return { ...list, [firstLetter]: updatedGroup };
}
interface Contact {
  id?: string,
  name: string,
  position: string,
  phone: string
}

type DeleteContactParams = Pick<Contact, 'id' | 'name'>

type ContactsByLetter = {
  [letter: string]: Contact[]
}

interface State {
  contactList: ContactsByLetter | null
}

interface Action {
  addContact: ({ name, position, phone }: Contact) => void,
  deleteContact: ({ id, name }: DeleteContactParams) => void,
  editContact: ({ id, name, position, phone }: Contact) => void,
  clearAllContacts: () => void
}


export const useContactsStore = create<State & Action>((set) => ({
  contactList: null,
  addContact: ({ name, position, phone }) => {
    set((state) => {
      const updatedList = addContact(state.contactList, { name, position, phone });
      return { contactList: updatedList };
    })
  },
  deleteContact: ({ id, name }) => {
    set((state) => {
      const updatedList = deleteContact(state.contactList, { id, name });
      return { contactList: updatedList };
    })
  },
  editContact: ({ id, name, position, phone }) => {
    set((state) => {
      const updatedList = editContact(state.contactList, { id, name, position, phone });
      return { contactList: updatedList };
    })
  },
  clearAllContacts: () => {
    set((state) => {
      console.log('clear all', state)
      return { contactList: null }
    })
  }
}));
