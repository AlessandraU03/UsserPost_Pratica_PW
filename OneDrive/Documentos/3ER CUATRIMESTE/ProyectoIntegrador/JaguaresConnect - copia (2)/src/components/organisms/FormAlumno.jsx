import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import HeaderAdmi from './HeaderAdmi';

function FormAlumno() {
  const navigate = useNavigate();

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

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const age = calculateAge(nacimiento);
    if (age < 3) {
      Swal.fire('Error', 'La edad del alumno debe ser mayor a 3 años.', 'error');
      return;
    }

    if (!nombre || !apellido || !edad || !cinta || !mensualidad || !nacimiento || !telefono || !correo || !fechainicio || !contraseña || !horario) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    const alumnoData = {
      nombre,
      apellido,
      edad,
      cinta,
      mensualidad: parseFloat(mensualidad.replace('$', '')),
      tutor_nombre,
      tutor_apellido,
      nacimiento,
      telefono,
      correo,
      fechainicio,
      contraseña,
      horario,
    };

    Swal.fire({
      title: 'Confirmar registro',
      text: '¿Desea guardar el registro?',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('https://jaguaresconnectapi.integrador.xyz/api/alumnos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(alumnoData)
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(data.message || 'Error en la solicitud');
            });
          }
        })
        .then(data => {
          Swal.fire('Registrado!', 'El registro ha sido insertado correctamente.', 'success');
          navigate('/Alumnos');
        })
        .catch(error => {
          console.error('Error:', error);
          Swal.fire('Error', `Ocurrió un error al insertar el registro: ${error.message}`, 'error');
        });
      } else if (result.isDenied) {
        Swal.fire('Guardado', 'El registro ha sido guardado pero no insertado.', 'info');
      }
    });
  };

  return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-[#002033] text-2xl font-bold mb-4">Registro de Estudiantes</h1>
        <div className="p-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <div></div>
          <div>
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
                type="select"
                id="cinta"
                value={cinta}
                onChange={(e) => setCinta(e.target.value)}
                placeholder="Seleccione el nivel de cinta"
                options={[
                  { label: 'Blanca', value: 'Blanca' },
                  { label: 'Amarilla', value: 'Amarilla' },
                  { label: 'Verde', value: 'Verde' },
                  { label: 'Azul', value: 'Azul' },
                  { label: 'Roja', value: 'Roja' },
                  { label: 'Negra', value: 'Negra' },
                ]}
              />
              <FormField
                label="Mensualidad"
                type="select"
                id="mensualidad"
                value={mensualidad}
                onChange={(e) => setMensualidad(e.target.value)}
                placeholder="Seleccione la mensualidad"
                options={[
                  { label: '400', value: 400 },
                  { label: '450', value: 450 },
                  { label: '700', value: 700 }
                ]}
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
                label="Nacimiento"
                type="date"
                id="nacimiento"
                value={nacimiento}
                onChange={(e) => setNacimiento(e.target.value)}
                placeholder="Ingrese la fecha de nacimiento"
              />
            </form>
          </div>
          <div className="col-span-1">
            <form className="space-y-4">
              <FormField
                label="Telefono"
                type="text"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ingrese el numero telefonico"
              />
              <FormField
                label="Correo Electronico"
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingrese el correo electronico"
              />
              <FormField
                label="Fecha de Inicio"
                type="date"
                id="fechaInicio"
                value={fechainicio}
                onChange={(e) => setFechainicio(e.target.value)}
                placeholder="Ingrese la fecha de inicio del alumno"
              />
              <FormField
                label="Horario"
                type="select"
                id="horario"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                placeholder="Seleccione el horario"
                options={[
                  { label: '5pm-6pm', value: '5pm-6pm'},
                  { label: '6pm-7pm', value: '6pm-7pm'},
                  { label: '5pm-7pm', value: '5pm-7pm'}
                ]}
              />
              <FormField
                label="Contraseña"
                type="password"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Ingrese la contraseña del alumno"
              />
              <div className="flex justify-start mt-4">
                <Button onClick={handleClick}>Insertar registro</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormAlumno;
