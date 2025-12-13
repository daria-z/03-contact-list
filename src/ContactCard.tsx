import { useContactsStore } from "./store";
import { Button } from "./Button";

interface ContactCardProps {
  id?: string,
  name: string,
  position: string,
  phone: string
}

export const ContactCard = ({ id, name, position, phone }: ContactCardProps) => {
  const deleteContact = useContactsStore((state) => state.deleteContact);
  return (
    <div data-id={id}>
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>Position:</strong> {position}
      </div>
      <div>
        <strong>Phone:</strong> {phone}
      </div>
      <div>
        <Button onClick={() => deleteContact({ id, name })} variant="danger">
          Delete
        </Button>
        <Button variant="secondary">
          Edit
        </Button>
      </div>
    </div>
  );
};
