const alphabet: string[] = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

interface LetterProps {
  letter: string;
}

const Letter = ({ letter }: LetterProps) => {
  return (
    <div data-letter={letter}>
      <div>
        <span>{letter}</span>
        <span></span>
      </div>
      <div></div>
    </div>
  )
}

export const AlphabetBlock = () => {
  return (
    <section>
      {alphabet.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </section>
  );
}

