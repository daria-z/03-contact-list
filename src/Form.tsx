import { useContactsStore } from "./store";
import { useForm, type SubmitHandler, type SubmitErrorHandler } from "react-hook-form";
import { Button } from "./Button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const UserFormSchema = z.object({
  name: z.string().min(3).trim().toLowerCase(),
  position: z.string().min(3).trim().toLowerCase(),
  phone: z.string().startsWith("+7", "Format: +7**********").trim().toLowerCase()
})

type FormData = z.infer<typeof UserFormSchema>;

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(UserFormSchema) });

  const clearAllContacts = useContactsStore((state) => state.clearAllContacts);
  const addContact = useContactsStore((state) => state.addContact);
  const state = useContactsStore.getState();

  const submit: SubmitHandler<FormData> = (data) => {
    addContact(data);
    console.log(data);
  };

  const error: SubmitErrorHandler<FormData> = () => {
    // const validationResult = UserFormSchema.parse(data);
    // console.error(validationResult);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit, error)}>
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
