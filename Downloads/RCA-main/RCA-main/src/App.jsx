import React from 'react';
import Input from './atoms/Input';
import Label from './atoms/Label';
import Button from './atoms/buton';

function App() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <Label className="text-blue-500">Nombre:</Label>
      <Input className="border-blue-500 w-full" placeholder="Escribe tu nombre" />
      <Button></Button>
    </div>
  );
}

export default App;
