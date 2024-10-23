import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import HeaderAdmi from '../organisms/HeaderAdmi';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import FormField from '../molecules/FormField';

function StudentEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [cinta, setCinta] = useState('');
    const [mensualidad, setMensualidad] = useState('');
    const [tutor_nombre, setTutor_nombre] = useState('');
  const [tutor_apellido, setTutor_apellido] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [fechainicio, setFechainicio] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [horario, setHorario] = useState('');

    useEffect(() => {
        fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${id}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error al obtener los datos del alumno');
            }
          })
          .then(data => {
            setNombre(data.nombre);
            setApellido(data.apellido);
            setEdad(data.edad);
            setCinta(data.cinta);
            setMensualidad(data.mensualidad);
            setTutor_nombre(data.tutor_nombre)
            setTutor_apellido(data.tutor_apellido)
            setNacimiento(data.nacimiento);
            setTelefono(data.telefono);
            setCorreo(data.correo);
            setFechainicio(data.fechainicio);
            setContraseña(data.contraseña);
            setHorario(data.horario);
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al obtener los datos del alumno.', 'error');
          });
    }, [id]);

    const handleUpdateClick = (e) => {
        e.preventDefault();
        Swal.fire({
          title: 'Confirmar actualización',
          text: '¿Desea actualizar los datos del alumno?',
          showCancelButton: true,
          confirmButtonText: 'Actualizar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({
                nombre,
                apellido,
                edad,
                cinta,
                mensualidad,
                tutor_nombre,
                tutor_apellido,
                nacimiento,
                telefono,
                correo,
                fechainicio,
                contraseña,
                horario
              })
            })
              .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Error en la solicitud de actualización');
                }
              })
              .then(data => {
                Swal.fire('Actualizado!', 'Los datos del alumno han sido actualizados correctamente.', 'success');
                navigate('/alumnos');
              })
              .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'Ocurrió un error al actualizar los datos del alumno.', 'error');
              });
          }
        });
      }

    return (
        <>
          <HeaderAdmi />
          <div className="container mx-auto p-6">
            <h1 className="text-center text-[#002033] text-2xl font-bold mb-4">Actualizar Datos del Alumno</h1>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center justify-center">
                {/* Aquí puedes poner la lógica para subir la imagen del alumno si lo deseas */}
                <Button>
                  <FontAwesomeIcon icon={faUpload} className="mr-2" />
                  Subir Foto
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
                    label="Apellido"
                    type="text"
                    id="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Ingrese el apellido"
                  />
                  <FormField
                    label="Edad"
                    type="number"
                    id="edad"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder="Ingrese la edad"
                  />
                  <FormField
                    label="Cinta"
                    type="text"
                    id="cinta"
                    value={cinta}
                    onChange={(e) => setCinta(e.target.value)}
                    placeholder="Ingrese la cinta"
                  />
                  <FormField
                    label="Mensualidad"
                    type="text"
                    id="mensualidad"
                    value={mensualidad}
                    onChange={(e) => setMensualidad(e.target.value)}
                    placeholder="Ingrese la mensualidad"
                  />
                  <FormField
                    label="Tutor"
                    type="text"
                    id="tutor"
                    value={tutor_nombre}
                    onChange={(e) => setTutor_nombre(e.target.value)}
                    placeholder="Ingrese el nombre del tutor"
                  />
                   <FormField
                    label="Tutor"
                    type="text"
                    id="tutor"
                    value={tutor_apellido}
                    onChange={(e) => setTutor_apellido(e.target.value)}
                    placeholder="Ingrese el apellido del tutor"
                  />
                  <FormField
                    label="Fecha de Nacimiento"
                    type="date"
                    id="nacimiento"
                    value={nacimiento}
                    onChange={(e) => setNacimiento(e.target.value)}
                  />
                  <FormField
                    label="Teléfono"
                    type="tel"
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ingrese el teléfono"
                  />
                  <FormField
                    label="Correo Electrónico"
                    type="email"
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Ingrese el correo electrónico"
                  />
                  <FormField
                    label="Fecha de Inicio"
                    type="date"
                    id="fechainicio"
                    value={fechainicio}
                    onChange={(e) => setFechainicio(e.target.value)}
                  />
                  <FormField
                    label="Contraseña"
                    type="password"
                    id="contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    placeholder="Ingrese la contraseña"
                  />
                  <FormField
                    label="Horario"
                    type="text"
                    id="horario"
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    placeholder="Ingrese el horario"
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

export default StudentEdit;