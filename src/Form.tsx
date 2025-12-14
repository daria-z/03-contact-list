import { useContactsStore, DuplicateContactError } from "./store";
import { type SubmitHandler } from "react-hook-form";
import { type ContactFormDataType, ContactForm } from "./ContactForm";

export const Form = () => {
  const addContact = useContactsStore((state) => state.addContact);

  const submit: SubmitHandler<ContactFormDataType> = (data) => {
    try {
      addContact(data);
      console.log(data);
    } catch (error) {
      if (error instanceof DuplicateContactError) {
        // setError("name", {
        //   type: "manual",
        //   message: error.message
        // });
        console.log(error);
        throw error;
      }
      throw error;
    }
  };

  return (
    <ContactForm onSubmit={submit} />
  );
};
