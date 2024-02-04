import React, { useState } from 'react';

// Components
import TextField from './Inputs/TextField';
import InputIcon from './Inputs/InputIcon';

// Icons
import { BiSearch } from 'react-icons/bi';

export default function Search(): React.JSX.Element {
  const [input, setInput] = useState<string>('');
  return (
    <TextField
      id="contacts"
      rounded="rounded-full"
      name="contacts"
      startIcon={
        <InputIcon position="start">
          <BiSearch className="text-xl" />
        </InputIcon>
      }
      placeholder="Buscar..."
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
  );
}
