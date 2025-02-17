import { useState, useEffect } from "preact/hooks";
import { Link } from 'preact-router';

const [name, setName] = useState<string>("");
const [flashCards, setFlashCards] = useState<Object>({});



const NewSet = () => {
    return (
      <>
        <Link href="/" className="home-link">Home</Link>
        <div>
          <p>Name: </p>
          <input onInput={setName(event.target.value)} value={name} />
          
        </div>
      </>
    );
  };
  
  export default NewSet;