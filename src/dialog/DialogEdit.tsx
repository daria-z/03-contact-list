import { useContactsStore } from "../store";
import { ContactForm, type ContactFormDataType } from "../ContactForm";
import { type SubmitHandler } from "react-hook-form";

interface ModalProps {
  initialValues: ContactFormDataType & { id: string },
  isOpen?: boolean;
  onClose: () => void;
}

export const DialogEdit = ({ initialValues, isOpen, onClose }: ModalProps) => {
  const editContact = useContactsStore((state) => state.editContact);

  const submit: SubmitHandler<ContactFormDataType> = (data) => {
    const hasChanges =
      data.name !== initialValues.name ||
      data.position !== initialValues.position ||
      data.phone !== initialValues.phone;

    if(hasChanges) editContact(data);
    onClose();
  };
  return (
    <dialog aria-labelledby="dialog-edit" id="dialogEdit" open={isOpen}>
      <button
        className="modal__close"
        aria-label="Close"
        onClick={onClose}
      >
        ×
      </button>
      <h2>Edit</h2>
      <section>
        <ContactForm
          onSubmit={submit}
          submitButtonText="Edit"
          initialValues={initialValues}
        />
      </section>
    </dialog>
  );
};
