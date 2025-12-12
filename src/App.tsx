import { AlphabetBlock } from './AlphabetBlock';
import { Form } from "./Form";


function App() {
  const now = new Date();
  return (
    <>
      <header>
        <h1>Contact List</h1>
      </header>
      <main>
        <Form />
        <AlphabetBlock />
      </main>
      <span>timestamp: {now.toLocaleTimeString()}</span>
    </>
  );
}

export default App







