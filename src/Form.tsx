import { useContactsStore } from "./store";
import { useForm } from "react-hook-form";
import { Button } from "./Button";

interface FormInput {
  name: string,
  position: string,
  phone: string
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const addContact = useContactsStore((state) => state.addContact);
  const clearAllContacts = useContactsStore((state) => state.clearAllContacts);
  const onSubmit = (data: FormInput) => {
    addContact(data);
    console.log(data);
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register("name", { required: true })} placeholder="Name" />
        {errors.name && <p>Name is required.</p>}
        <label>Position</label>
        <input
          {...register("position", { required: true })}
          placeholder="Position"
        />
        <label>Phone Number</label>
        <input {...register("phone", { required: true })} placeholder="Phone" />
        <Button type="submit">Add</Button>
      </form>
      <Button variant="secondary" onClick={clearAllContacts}>
        Clear All
      </Button>
      <Button variant="secondary">Search</Button>
    </>
  );
};
