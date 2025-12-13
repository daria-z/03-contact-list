import { useState } from "react";
import { useContactsStore } from "./store";
import { ContactCard } from "./ContactCard";

const alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".split("");

interface LetterProps {
  letter: string;
}

const Letter = ({ letter }: LetterProps) => {
  const contactsForLetter = useContactsStore((state) => {
    return state.contactList?.[letter];
  });

  const contactsCount = contactsForLetter?.length || 0;
  const displayContacts = contactsForLetter || [];
  const [showContacts, setShowContacts] = useState(false);

  const toggleShowContacts = () => {
    setShowContacts(current => !current)
  };

  return (
    <div data-letter={letter}>
      <div onClick={toggleShowContacts}>
        <span>{letter}</span>
        {!!contactsCount && <span>{contactsCount}</span>}
      </div>
      {showContacts && <div>
        {displayContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            id={contact.id}
            name={contact.name}
            position={contact.position}
            phone={contact.phone}
          />
        ))}
      </div>
      }
    </div>
  );
};

export const AlphabetBlock = () => {
  return (
    <section>
      {alphabet.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </section>
  );
};
