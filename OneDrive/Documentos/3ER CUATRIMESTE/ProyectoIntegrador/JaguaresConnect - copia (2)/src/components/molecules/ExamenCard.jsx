import React from 'react';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Swal from 'sweetalert2';

function ExamenCard({ examen, onDeleteClick }) {

  const confirmDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el examen de ${examen.nombrealumno}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteClick(examen.id);
        Swal.fire(
          '¡Eliminado!',
          `El examen ${examen.nombrealumno} ha sido eliminado.`,
          'success'
        );
      }
    });
  };
  return (
    <div className="flex flex-col items-center p-4 border rounded-md shadow-md">
      <Image alt={examen.nombrealumno} />
      <h2 className="mt-2 text-lg font-semibold">{examen.nombrealumno}</h2>
      <Text className="text-gray-500">EXAMEN N°{examen.id}</Text>
      <div className="flex mt-4 space-x-2">
        <Button className="bg-[#7FB16E] text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" type="view">Ver</Button>
        <Button onClick={confirmDelete} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" type="delete">Eliminar</Button>
        <Button type="update" className="bg-[#5E4BD1] text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" >Modificar</Button>
      </div>
    </div>
  );
}

export default ExamenCard;
