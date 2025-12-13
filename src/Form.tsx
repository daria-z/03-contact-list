import { useContactsStore, DuplicateContactError } from "./store";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "./Button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserFormSchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only English letters")
    .trim()
    .toLowerCase(),
  position: z.string()
    .min(3, "Position must be at least 3 characters")
    .regex(/^[a-zA-Z\s]+$/, "Position must contain only English letters")
    .trim()
    .toLowerCase(),
  phone: z.string()
    .startsWith("+7", "Format: +7**********")
    .trim()
    .toLowerCase()
})

type FormData = z.infer<typeof UserFormSchema>;

export const Form = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(UserFormSchema) });

  const clearAllContacts = useContactsStore((state) => state.clearAllContacts);
  const addContact = useContactsStore((state) => state.addContact);
  const state = useContactsStore.getState();

  const submit: SubmitHandler<FormData> = (data) => {
    try {
      addContact(data);
      console.log(data);
    } catch (error) {
      if (error instanceof DuplicateContactError) {
        setError("name", {
          type: "manual",
          message: error.message
        });
        console.log(error)
        return;
      }
      throw error;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <label>Name</label>
        <input {...register("name", { required: true })} placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}
        <label>Position</label>
        <input
          {...register("position", { required: true })}
          placeholder="Position"
        />
        {errors.position && <p>{errors.position.message}</p>}
        <label>Phone Number</label>
        <input {...register("phone", { required: true })} placeholder="Phone" />
        {errors.phone && <p>{errors.phone.message}</p>}
        <Button type="submit">Add</Button>
      </form>
      <Button variant="secondary" onClick={() => {
        clearAllContacts();
        console.info(state);
      }}>
        Clear All
      </Button>
      <Button variant="secondary">Search</Button>
    </>
  );
};
