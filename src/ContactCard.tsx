import { Button } from "./Button";

interface ContactCardProps {
  id?: string,
  name: string,
  position: string,
  phone: string
}

export const ContactCard = ({ id, name, position, phone }: ContactCardProps) => {
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
        <Button data-delete="smR-MUDJCMM6dMoCjSWkS" variant="danger">
          Delete
        </Button>
        <Button data-edit="smR-MUDJCMM6dMoCjSWkS" variant="secondary">
          Edit
        </Button>
      </div>
    </div>
  );
};
