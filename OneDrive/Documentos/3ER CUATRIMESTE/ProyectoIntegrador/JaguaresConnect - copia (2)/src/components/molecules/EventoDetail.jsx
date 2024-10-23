import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderAdmi from '../organisms/HeaderAdmi';
import Button from '../atoms/Button';
import FormField from './FormField';

function EventoDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClick = () => {
    navigate("/Eventos");
  };
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/eventos/${id}`)
      .then(response => response.json())
      .then(data => setEvento(data))
      .catch(error => console.error('Error fetching student data:', error));
  }, [id]);

  if (!evento) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-4">
      <h1 className="text-xl text-center font-semibold mb-4">{evento.nombre}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      <div></div>
      <div>
      <FormField label="Fecha" type="text" id="fecha" value={evento.fecha} readOnly />
          <FormField label="Lugar" type="text" id="lugar" value={evento.lugar} readOnly />
          <FormField label="Hora" type="correo" id="hora" value={evento.hora} readOnly />
          <FormField label="Categorias" type="text" id="categorias" value={evento.categorias} readOnly />
          <FormField label="Costo" type="number" id="costo" value={evento.costo} readOnly />
          <div className="mt-4">
            <Button onClick={handleClick}>Salir</Button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}


export default EventoDetail;
