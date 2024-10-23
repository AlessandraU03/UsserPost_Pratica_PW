import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import HeaderAdmi from '../organisms/HeaderAdmi';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import FormField from '../molecules/FormField';

function EquipoEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [talla, setTalla] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [composicion, setComposicion] = useState('');
    const [color, setColor] = useState('');
  
    useEffect(() => {
      fetch(`https://jaguaresconnectapi.integrador.xyz/api/equipos/${id}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al obtener los datos del equipo');
          }
        })
        .then(data => {
          setNombre(data.nombre);
          setTalla(data.talla);
          setPrecio(data.precio);
          setDescripcion(data.descripcion);
          setComposicion(data.composicion);
          setColor(data.color);
        })
        .catch(error => {
          console.error('Error:', error);
          Swal.fire('Error', 'Ocurrió un error al obtener los datos del equipo.', 'error');
        });
    }, [id]);
  
    const handleUpdateClick = (e) => {
      e.preventDefault();
      Swal.fire({
        title: 'Confirmar actualización',
        text: "¿Desea actualizar el equipo?",
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`https://jaguaresconnectapi.integrador.xyz/api/equipos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              "nombre": nombre,
              "talla": talla,
              "precio": precio,
              "descripcion": descripcion,
              "composicion": composicion,
              "color": color 
            })
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Error en la solicitud');
              }
            })
            .then(data => {
              Swal.fire('Actualizado!', 'El equipo ha sido actualizado correctamente.', 'success');
              navigate('/Equipos');
            })
            .catch(error => {
              console.error('Error:', error);
              Swal.fire('Error', 'Ocurrió un error al actualizar el equipo.', 'error');
            });
        }
      });
    }
  
    return (
      <>
        <HeaderAdmi />
        <div className="container mx-auto p-6">
          <h1 className="text-center text-[#002033] text-2xl font-bold mb-4">Actualizar Equipo</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center justify-center">
              <img src="/images/equipo.jpg" alt="Equipo" className="w-full h-auto" />
              <Button>
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                Subir Equipo
              </Button>
            </div>
            <div className="md:w-1/2 md:ml-4">
              <form className="space-y-4">
                <FormField
                  label="Nombre"
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingrese el nombre"
                />
                <FormField
                  label="Talla"
                  type="text"
                  id="talla"
                  value={talla}
                  onChange={(e) => setTalla(e.target.value)}
                  placeholder="Ingrese la talla"
                />
                <FormField
                  label="Precio"
                  type="number"
                  id="precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Ingrese el precio del equipo"
                />
                <FormField
                  label="Descripción"
                  type="text"
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Ingrese la descripción del equipo"
                />
                <FormField
                  label="Composición"
                  type="text"
                  id="composicion"
                  value={composicion}
                  onChange={(e) => setComposicion(e.target.value)}
                  placeholder="Ingrese la composición del equipo"
                />
                <FormField
                  label="Color"
                  type="text"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Ingrese el color del equipo"
                />
                <div className="flex justify-start">
                  <Button onClick={handleUpdateClick}>Actualizar</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
export default EquipoEdit;
