import { useContactsStore } from "./store";
import { Button } from "./Button";

export const ListControls = () => {
  const clearAllContacts = useContactsStore((state) => state.clearAllContacts);

  return(
    <>
      <Button
        variant="secondary"
        onClick={() => {
          clearAllContacts();
        }}
      >
        Clear All
      </Button>
      <Button variant="secondary">Search</Button>
    </>
  );
};


