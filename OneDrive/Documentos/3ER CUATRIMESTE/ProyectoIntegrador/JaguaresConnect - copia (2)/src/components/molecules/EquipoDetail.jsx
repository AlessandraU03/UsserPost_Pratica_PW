import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderAdmi from '../organisms/HeaderAdmi';
import Button from '../atoms/Button';

function EquipoDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClick = () => {
    navigate("/Equipos");
  };
  const [equipo, setEquipo] = useState(null);

  useEffect(() => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/equipos/${id}`)
      .then(response => response.json())
      .then(data => setEquipo(data))
      .catch(error => console.error('Error fetching student data:', error));
  }, [id]);

  if (!equipo) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <>
      <HeaderAdmi />
      <div className="p-4 md:p-8 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div></div>
        <div className="space-y-12">
          <h1 className="text-xl font-semibold">{equipo.nombre} {equipo.color}</h1>
          <p><strong>Talla:</strong> {equipo.talla} </p>
          <p className='text-red-500'> ${equipo.precio}</p>
          <p>{equipo.descripcion}</p>
          <p><strong>Composicion:</strong> {equipo.composicion}</p>
          <div className="mt-4">
            <Button onClick={handleClick}>Salir</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EquipoDetail;
