import { Button } from "./Button";

export const Form = () => {
  return (
    <>
      <form>
        <input type="text" name="name" id="name" />
        <input type="text" name="position" id="position" />
        <input type="text" name="phone" id="phone" />
      </form>
      <Button>Add</Button>
      <Button variant="secondary">Clear All</Button>
      <Button variant="secondary">Search</Button>
    </>
  );
}



