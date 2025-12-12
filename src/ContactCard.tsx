import { Button } from "./Button";
import { useContactStore } from "./store";

interface ContactCardProps {
  name: string,
  position: string,
  phone: string
}

export const ContactCard = ({ name, position, phone }: ContactCardProps) => {
  const count = useContactStore((state) => state.contactsCount);

  return (
    <div data-id="">
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
        <Button data-delete="smR-MUDJCMM6dMoCjSWkS" variant="danger">
          Delete
        </Button>
        <Button data-edit="smR-MUDJCMM6dMoCjSWkS" variant="secondary">
          Edit
        </Button>
      </div>
    </div>
  );
}



