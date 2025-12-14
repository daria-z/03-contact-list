import { useContactsStore } from "./store";
import { Button } from "./Button";
import { useState } from "react";
import { DialogEdit } from "./dialog/DialogEdit";

interface ContactCardProps {
  id: string,
  name: string,
  position: string,
  phone: string
}

export const ContactCard = ({ id, name, position, phone }: ContactCardProps) => {
  const deleteContact = useContactsStore((state) => state.deleteContact);
  const [showEditForm, setShowEditForm] = useState(false)

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
        <Button variant="secondary" onClick={() => setShowEditForm(true)}>
          Edit
        </Button>
      </div>

      {showEditForm && (
        <DialogEdit initialValues={{id, name, position, phone}} isOpen={showEditForm} onClose={() => setShowEditForm(false)} />
      )}
    </div>
  );
};
