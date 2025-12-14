import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "./Button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const UserFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only English letters")
    .trim()
    .toLowerCase(),
  position: z
    .string()
    .min(3, "Position must be at least 3 characters")
    .regex(/^[a-zA-Z\s]+$/, "Position must contain only English letters")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .startsWith("+7", "Format: +7**********")
    .trim()
    .toLowerCase(),
});

export type ContactFormDataType = z.infer<typeof UserFormSchema>;

interface ContactFormProps {
  onSubmit: SubmitHandler<ContactFormDataType>;
  initialValues?: Partial<ContactFormDataType>;
  submitButtonText?: string;
  onCancel?: () => void;
}

export const ContactForm = ({
    initialValues,
    onSubmit,
    submitButtonText = "Add",
    onCancel,
  }: ContactFormProps) => {

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm<ContactFormDataType>({
    defaultValues: initialValues,
    resolver: zodResolver(UserFormSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit">{submitButtonText}</Button>
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
      </form>
    </>
  );
};
