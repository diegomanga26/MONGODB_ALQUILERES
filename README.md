# Base de Datos de Alquiler de Automóviles - Documentación

Esta base de datos contiene información relacionada con el alquiler de automóviles, clientes, empleados, reservas, sucursales y más. A continuación, se describen las colecciones y sus propiedades, así como ejemplos de consultas que se pueden realizar.

#### NOTA IMPORTANTE: 

Aún el typescript no se ha realizado y ya que futuramente se añadirán los DTO correspondientes, sin embargo es añadido a la documentación, por favor hacer caso omiso a los mi

## Requisitos previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

- Node.js versión 18.16.1 (Preferiblemente).
- MongoDB.
- npm (Administrador de paquetes de Node.js).

## Configuración

1. Clona este repositorio en tu máquina local usando el siguiente comando:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

1. Navega a la carpeta raíz del proyecto.
2. Instala las dependencias utilizando el siguiente comando npm en la consola:

```
npm install
```

1. Preferentemente en otra terminal, convierte los archivos TypeScript en JavaScript en la carpeta "controller" ejecutando:

```
npm run tsc
```

1. Realiza la conexión con el servidor MongoDB utilizando tu herramienta preferida.
2. Ejecuta las consultas iniciales en tu base de datos MongoDB. Puedes encontrar las consultas en el archivo "query.mongodb" contenido en la carpeta "db".

## Ejecución

1. Crea un archivo `.env` en la raíz del proyecto con las rutas de conexión necesarias. Puedes encontrar un ejemplo en `.env.example`.
2. Inicia el servidor de desarrollo con el siguiente comando:

```
npm run dev
```

Esto iniciará el servidor en `http://127.10.10.10:5816` por defecto.

## Endpoints de la API

A continuación, se describen los endpoints disponibles en la API junto con ejemplos de cómo realizar las consultas.

### 1. Consulta de Alquiler:

#### 1.1 Mostrar todos los clientes registrados en la base de datos:

- Ruta: `/cliente`
- Método: GET
- Realiza la consulta para obtener todos los clientes:

```
GET http://127.10.10.10:5816/cliente
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "64da88c29390b91b229112f9",
    "cliente": 1,
    "nombre": "Juan",
    "apellido": "Perez",
    "documento": "12345678",
    "direccion": "Calle 123",
    "numero": "11111111",
    "Email": "juan@example.com"
  },
  {
    "_id": "64da88c29390b91b229112fa",
    "cliente": 2,
    "nombre": "Maria",
    "apellido": "Lopez",
    "documento": "87654321",
    "direccion": "Avenida 456",
    "numero": "22222222",
    "Email": "maria@example.com"
  },
  {
    "_id": "64da88c29390b91b229112fb",
    "cliente": 3,
    "nombre": "Pedro",
    "apellido": "Gonzalez",
    "documento": "56789012",
    "direccion": "Plaza 789",
    "numero": "33333333",
    "Email": "pedro@example.com"
  },
  {
    "_id": "64da88c29390b91b229112fc",
    "cliente": 4,
    "nombre": "Laura",
    "apellido": "Martinez",
    "documento": "09876543",
    "direccion": "Ruta 101",
    "numero": "44444444",
    "Email": "laura@example.com"
  },
  {
    "_id": "64da88c29390b91b229112fd",
    "cliente": 5,
    "nombre": "Carlos",
    "apellido": "Gomez",
    "documento": "43210987",
    "direccion": "Calle 987",
    "numero": "55555555",
    "Email": "carlos@example.com"
  }
]
```

#### 1.2 Obtener todos los automóviles disponibles para alquiler:

- Ruta: `/automovil/disponibles`
- Método: GET
- Realiza la consulta para obtener los automóviles disponibles:

```
GET http://127.10.10.10:5816/automovile/disponibles
```

- Ejemplo de respuesta:

```
[
  {
    "marca": "Honda",
    "modelo": "Civic",
    "anio": 2020,
    "tipo": "Sedan",
    "capacidad": 5,
    "precio_diaro": 45,
    "alquileres": {
      "alquiler": 5,
      "cliente": 5,
      "automovil": 2,
      "inicio": "2023-07-05",
      "fin": "2023-07-09",
      "costo": 225,
      "estado": "Disponible"
    }
  },
  {
    "marca": "Chevrolet",
    "modelo": "Equinox",
    "anio": 2022,
    "tipo": "SUV",
    "capacidad": 5,
    "precio_diaro": 55,
    "alquileres": {
      "alquiler": 2,
      "cliente": 2,
      "automovil": 4,
      "inicio": "2023-07-02",
      "fin": "2023-07-07",
      "costo": 275,
      "estado": "Disponible"
    }
  }
]
```

#### 1.3 Listar todos los alquileres activos junto con los datos de los clientes relacionados:

- Ruta: `/alquiler/activo`
- Método: GET
- Realiza la consulta para obtener los alquileres activos con los datos de los clientes:

```
arduinoCopy code
GET http://127.10.10.10:5816/alquiler/activo
```

- Ejemplo de respuesta:

```
[
  {
    "alquiler": 1,
    "cliente": 1,
    "automovil": 3,
    "costo": 240,
    "estado": "Activo",
    "fk_alquiler_cliente": [
      {
        "cliente": 1,
        "nombre": "Juan",
        "apellido": "Perez",
        "documento": "12345678",
        "direccion": "Calle 123",
        "numero": "11111111",
        "Email": "juan@example.com"
      }
    ]
  },
  {
    "alquiler": 3,
    "cliente": 3,
    "automovil": 1,
    "costo": 150,
    "estado": "Activo",
    "fk_alquiler_cliente": [
      {
        "cliente": 3,
        "nombre": "Pedro",
        "apellido": "Gonzalez",
        "documento": "56789012",
        "direccion": "Plaza 789",
        "numero": "33333333",
        "Email": "pedro@example.com"
      }
    ]
  },
  {
    "alquiler": 4,
    "cliente": 4,
    "automovil": 5,
    "costo": 192,
    "estado": "Activo",
    "fk_alquiler_cliente": [
      {
        "cliente": 4,
        "nombre": "Laura",
        "apellido": "Martinez",
        "documento": "09876543",
        "direccion": "Ruta 101",
        "numero": "44444444",
        "Email": "laura@example.com"
      }
    ]
  }
]
```

#### 1.4 Obtener los detalles del alquiler con el ID_Alquiler específico:

- Ruta: `/alquiler/detalle/:alquiler`
- Pasarás el ID específico que desees buscar en el parámetro de la siguiente forma.
- Método: GET
- Realiza la consulta para obtener los detalles de alquiler por ID específico del alquiler:

```
GET http://127.10.10.10:5816/alquiler/detalle/1
```

- Ejemplo de respuesta:

```
[
  {
    "alquiler": 1,
    "cliente": 1,
    "automovil": 3,
    "inicio": "2023-07-01",
    "fin": "2023-07-05",
    "costo": 240,
    "estado": "Activo",
    "fk_alquiler_cliente": [
      {
        "cliente": 1,
        "nombre": "Juan",
        "apellido": "Perez",
        "documento": "12345678",
        "direccion": "Calle 123",
        "numero": "11111111",
        "Email": "juan@example.com"
      }
    ]
  }
]
```

#### 1.5 Obtener el costo total de un alquiler específico.

- Ruta: `alquiler/costoAlquiler/:idAlquiler`
- Método: GET
- Realiza la consulta para obtener el costo total de un alquiler específico:

```
GET http://127.10.10.10:5816/alquiler/costoAlquiler/1
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "64da88c29390b91b229112fe",
    "alquiler": 1,
    "cliente": 1,
    "automovil": 3,
    "inicio": "2023-07-01",
    "fin": "2023-07-05",
    "costo": 240,
    "estado": "Activo"
  }
]
```

#### 1.6 Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05' o como se desee.

- Ruta: `/alquiler/fecha/:fechax`
- Método: GET
- Realiza la consulta para obtener los detalles del alquiler con fecha de inicio '2023-07-05':

```
GET http://127.10.10.10:5816/alquiler/fecha/2023-07-05
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "64da88c29390b91b22911302",
    "alquiler": 5,
    "cliente": 5,
    "automovil": 2,
    "inicio": "2023-07-05",
    "fin": "2023-07-09",
    "costo": 225,
    "estado": "Disponible"
  }
]
```

#### 1.7 Obtener la cantidad total de alquileres registrados en la base de datos.

- Ruta: `/alquiler/total`
- Método: GET
- Realiza la consulta para obtener la cantidad total de alquileres registrados en la base de datos:

```
GET http://127.10.10.10:5816/alquiler/total
```

- Ejemplo de respuesta:

```
[
  {
    "Total de Alquileres": 5
  }
]
```

#### 1.8 Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10' o los que se desee.

- Ruta: `/alquiler/fecha/:fechaIni/:fechaFin`
- Método: GET
- En este caso el cliente podrá ingresar el rango de fechas que desee según sus necesidades teniendo en cuenta que la primera fecha ingresada es la fecha de inicio y la segunda la fecha final.
- Realiza la consulta para listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10':

```
GET http://127.10.10.10:5816/alquiler/fecha/2023-07-05/2023-07-10
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "64da88c29390b91b22911302",
    "alquiler": 5,
    "cliente": 5,
    "automovil": 2,
    "inicio": "2023-07-05",
    "fin": "2023-07-09",
    "costo": 225,
    "estado": "Disponible"
  }
]
```

### 2. Consulta de Reserva:

#### 2.1 Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado:

- Ruta: `/reserva/pendientes`
- Método: GET
- Realiza la consulta para obtener las reservas pendientes con datos de clientes y automóviles:

```
GET http://127.10.10.10:5816/reserva/pendientes
```

- Ejemplo de respuesta:

```
[
  {
    "reserva": 1,
    "cliente": 2,
    "automovil": 1,
    "reserva_fecha": "2023-07-06",
    "inicio": "2023-07-10",
    "fin": "2023-07-15",
    "estado": "Pendiente",
    "fk_cliente": {
      "cliente": 2,
      "nombre": "Maria",
      "apellido": "Lopez",
      "documento": "87654321",
      "direccion": "Avenida 456",
      "numero": "22222222",
      "Email": "maria@example.com"
    },
    "fk_automovil": {
      "automovil": 1,
      "marca": "Toyota",
      "modelo": "Corolla",
      "anio": 2021,
      "tipo": "Sedan",
      "capacidad": 5,
      "precio_diaro": 50
    }
  },
  {
    "reserva": 2,
    "cliente": 3,
    "automovil": 3,
    "reserva_fecha": "2023-07-07",
    "inicio": "2023-07-12",
    "fin": "2023-07-17",
    "estado": "Pendiente",
    "fk_cliente": {
      "cliente": 3,
      "nombre": "Pedro",
      "apellido": "Gonzalez",
      "documento": "56789012",
      "direccion": "Plaza 789",
      "numero": "33333333",
      "Email": "pedro@example.com"
    },
    "fk_automovil": {
      "automovil": 3,
      "marca": "Ford",
      "modelo": "Explorer",
      "anio": 2019,
      "tipo": "SUV",
      "capacidad": 7,
      "precio_diaro": 60
    }
  },
  {
    "reserva": 3,
    "cliente": 4,
    "automovil": 2,
    "reserva_fecha": "2023-07-08",
    "inicio": "2023-07-14",
    "fin": "2023-07-19",
    "estado": "Pendiente",
    "fk_cliente": {
      "cliente": 4,
      "nombre": "Laura",
      "apellido": "Martinez",
      "documento": "09876543",
      "direccion": "Ruta 101",
      "numero": "44444444",
      "Email": "laura@example.com"
    },
    "fk_automovil": {
      "automovil": 2,
      "marca": "Honda",
      "modelo": "Civic",
      "anio": 2020,
      "tipo": "Sedan",
      "capacidad": 5,
      "precio_diaro": 45
    }
  },
  {
    "reserva": 4,
    "cliente": 5,
    "automovil": 4,
    "reserva_fecha": "2023-07-09",
    "inicio": "2023-07-15",
    "fin": "2023-07-20",
    "estado": "Pendiente",
    "fk_cliente": {
      "cliente": 5,
      "nombre": "Carlos",
      "apellido": "Gomez",
      "documento": "43210987",
      "direccion": "Calle 987",
      "numero": "55555555",
      "Email": "carlos@example.com"
    },
    "fk_automovil": {
      "automovil": 4,
      "marca": "Chevrolet",
      "modelo": "Equinox",
      "anio": 2022,
      "tipo": "SUV",
      "capacidad": 5,
      "precio_diaro": 55
    }
  },
  {
    "reserva": 5,
    "cliente": 5,
    "automovil": 5,
    "reserva_fecha": "2023-07-10",
    "inicio": "2023-07-16",
    "fin": "2023-07-21",
    "estado": "Pendiente",
    "fk_cliente": {
      "cliente": 5,
      "nombre": "Carlos",
      "apellido": "Gomez",
      "documento": "43210987",
      "direccion": "Calle 987",
      "numero": "55555555",
      "Email": "carlos@example.com"
    },
    "fk_automovil": {
      "automovil": 5,
      "marca": "Nissan",
      "modelo": "Sentra",
      "anio": 2022,
      "tipo": "Sedan",
      "capacidad": 4,
      "precio_diaro": 48
    }
  }
]
```

#### 2.2 Listar las reservas pendientes realizadas por un cliente específico.

- Ruta: `/reserva/cliente/:clienteEsp`
- Método: GET
- Realiza la consulta para obtener las reservas pendientes realizadas por un cliente específico:

```
GET http://127.10.10.10:5816/reserva/cliente/2
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "64da88c29390b91b229112f4",
    "reserva": 1,
    "cliente": 2,
    "automovil": 1,
    "reserva_fecha": "2023-07-06",
    "inicio": "2023-07-10",
    "fin": "2023-07-15",
    "estado": "Pendiente"
  }
]
```

#### 2.3 Obtener los datos del cliente que realizó la reserva con ID_Reserva específico.

- Ruta: `/reserva/:idReserva`
- Método: GET
- Realiza la consulta para obtener los datos del cliente que realizó la reserva con ID_Reserva específico:

```
GET http://127.10.10.10:5816/reserva/1
```

- Ejemplo de respuesta:

```
[
  {
    "reserva": 1,
    "cliente": 2,
    "nombre": "Maria",
    "apellido": "Lopez",
    "documento": "87654321",
    "direccion": "Avenida 456",
    "numero": "22222222",
    "Email": "maria@example.com"
  }
]
```

### 3. Consulta de Empleado:

#### 3.1 Listar los empleados con el cargo de "Vendedor":

- Ruta: `/empleado/vendedores`
- Método: GET
- Realiza la consulta para obtener los empleados con cargo de "Vendedor":

```
GET http://127.10.10.10:5816/empleado/vendedores
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "64da88c39390b91b2291130f",
    "empleado": 3,
    "nombre": "Elena",
    "apellido": "Fernandez",
    "documento": "456789012",
    "direccion": "Plaza 333",
    "numero": "3333333333",
    "cargo": "Vendedor"
  },
  {
    "_id": "64da88c39390b91b22911311",
    "empleado": 5,
    "nombre": "Carlos",
    "apellido": "Hernandez",
    "documento": "543210987",
    "direccion": "Carretera 555",
    "numero": "5555555555",
    "cargo": "Vendedor"
  }
]
```

#### 3.2 Mostrar los empleados con cargo de "Gerente" o "Asistente".

- Ruta: `/empleado/gerente&asistente`
- Método: GET
- Realiza la consulta para obtener los empleados con cargo de "Gerente" o "Asistente":

```
GET http://127.10.10.10:5816/empleado/gerente&asistente
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "64da88c39390b91b2291130d",
    "empleado": 1,
    "nombre": "Ana",
    "apellido": "Gomez",
    "documento": "123456789",
    "direccion": "Calle 111",
    "numero": "1111111111",
    "cargo": "Gerente"
  },
  {
    "_id": "64da88c39390b91b2291130e",
    "empleado": 2,
    "nombre": "Luis",
    "apellido": "Rodriguez",
    "documento": "987654321",
    "direccion": "Avenida 222",
    "numero": "2222222222",
    "cargo": "Asistente"
  },
  {
    "_id": "64da88c39390b91b22911310",
    "empleado": 4,
    "nombre": "Mario",
    "apellido": "Torres",
    "documento": "210987654",
    "direccion": "Ruta 444",
    "numero": "4444444444",
    "cargo": "Asistente"
  }
]
```

### 4. Consulta de Sucursal_automovil:

#### 4.1 Mostrar la cantidad total de automóviles disponibles en cada sucursal:

- Ruta: `/sucursalAutomovil/autosDisponibles`
- Método: GET
- Realiza la consulta para obtener la cantidad de automóviles disponibles en cada sucursal:

```
GET http://127.10.10.10:5816/sucursalAutomovil/autosDisponibles
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "Sucursal B",
    "Cantidad_Disponible": 5
  },
  {
    "_id": "Sucursal C",
    "Cantidad_Disponible": 2
  },
  {
    "_id": "Sucursal A",
    "Cantidad_Disponible": 3
  },
  {
    "_id": "Sucursal D",
    "Cantidad_Disponible": 4
  },
  {
    "_id": "Sucursal E",
    "Cantidad_Disponible": 1
  }
]
```

### 5. Consulta de Cliente:

#### 5.1 Listar los clientes con el DNI específico:

- Ruta: `/cliente/DNI/:dniEspecifico`
- Método: GET
- En este caso podremos poner donde va ':dniEspecifico' el DNI que se necesite buscar en este caso, como en el siguiente ejemplo.
- Realiza la consulta para obtener los clientes con un DNI específico:

```
GET http://127.10.10.10:5816/cliente/DNI/12345678
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "64da88c29390b91b229112f9",
    "cliente": 1,
    "nombre": "Juan",
    "apellido": "Perez",
    "documento": "12345678",
    "direccion": "Calle 123",
    "numero": "11111111",
    "Email": "juan@example.com"
  }
]
```

#### 5.2 Obtener los datos de los clientes que realizaron al menos un alquiler.

- Ruta: `/cliente/minima`
- Método: GET
- Realiza la consulta para obtener los datos de los clientes que realizaron al menos un alquiler:

```
GET http://127.10.10.10:5816/cliente/minima
```

- Ejemplo de respuesta:

```
[
  {
    "cliente": 1,
    "nombre": "Juan",
    "apellido": "Perez",
    "documento": "12345678",
    "direccion": "Calle 123",
    "numero": "11111111",
    "Email": "juan@example.com"
  },
  {
    "cliente": 2,
    "nombre": "Maria",
    "apellido": "Lopez",
    "documento": "87654321",
    "direccion": "Avenida 456",
    "numero": "22222222",
    "Email": "maria@example.com"
  },
  {
    "cliente": 3,
    "nombre": "Pedro",
    "apellido": "Gonzalez",
    "documento": "56789012",
    "direccion": "Plaza 789",
    "numero": "33333333",
    "Email": "pedro@example.com"
  },
  {
    "cliente": 4,
    "nombre": "Laura",
    "apellido": "Martinez",
    "documento": "09876543",
    "direccion": "Ruta 101",
    "numero": "44444444",
    "Email": "laura@example.com"
  },
  {
    "cliente": 5,
    "nombre": "Carlos",
    "apellido": "Gomez",
    "documento": "43210987",
    "direccion": "Calle 987",
    "numero": "55555555",
    "Email": "carlos@example.com"
  }
]
```



### 6. Consulta de Automovil:

#### 6.1 Mostrar todos los automóviles con una capacidad mayor a 5 personas.

- Ruta: `/automovil/auto5`
- Método: GET
- Realiza la consulta para obtener los automóviles con una capacidad mayor a 5 personas:

```
GET http://127.10.10.10:5816/automovil/auto5
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "64da88c29390b91b229112ec",
    "automovil": 3,
    "marca": "Ford",
    "modelo": "Explorer",
    "anio": 2019,
    "tipo": "SUV",
    "capacidad": 7,
    "precio_diaro": 60
  }
]
```

#### 6.2 Listar todos los automóviles ordenados por marca y modelo.

- Ruta: `/automovil/marca&modelo`
- Método: GET
- Realiza la consulta para listar todos los automóviles ordenados por marca y modelo:

```
GET http://127.10.10.10:5816/automovil/marca&modelo
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "Chevrolet",
    "modelos": [
      {
        "automovil": 4,
        "modelo": "Equinox",
        "anio": 2022,
        "tipo": "SUV",
        "capacidad": 5,
        "precio_diaro": 55
      }
    ]
  },
  {
    "_id": "Ford",
    "modelos": [
      {
        "automovil": 3,
        "modelo": "Explorer",
        "anio": 2019,
        "tipo": "SUV",
        "capacidad": 7,
        "precio_diaro": 60
      }
    ]
  },
  {
    "_id": "Honda",
    "modelos": [
      {
        "automovil": 2,
        "modelo": "Civic",
        "anio": 2020,
        "tipo": "Sedan",
        "capacidad": 5,
        "precio_diaro": 45
      }
    ]
  },
  {
    "_id": "Nissan",
    "modelos": [
      {
        "automovil": 5,
        "modelo": "Sentra",
        "anio": 2022,
        "tipo": "Sedan",
        "capacidad": 4,
        "precio_diaro": 48
      }
    ]
  },
  {
    "_id": "Toyota",
    "modelos": [
      {
        "automovil": 1,
        "modelo": "Corolla",
        "anio": 2021,
        "tipo": "Sedan",
        "capacidad": 5,
        "precio_diaro": 50
      }
    ]
  }
]
```

#### 6.3 Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.

- Ruta: `/automovil/disponibles/:capacidadAuto`
- Método: GET
- Realiza la consulta para obtener los automóviles con capacidad igual a 5 personas y disponibles:

```
GET http://127.10.10.10:5816/automovil/disponibles/5
```

- Ejemplo de respuesta:

```
[
  {
    "_id": "64da88c29390b91b229112ec",
    "automovil": 3,
    "marca": "Ford",
    "modelo": "Explorer",
    "anio": 2019,
    "tipo": "SUV",
    "capacidad": 7,
    "precio_diaro": 60
  }
]
```

### 7. Consulta de Sucursal:

#### 7.1. Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.

- Ruta: `/sucursal/automoviles`
- Método: GET
- Realiza la consulta para mostrar la cantidad total de automóviles en cada sucursal junto con su dirección:

```
GET http://127.10.10.10:5816/sucursal/automoviles
```

- Ejemplo de respuesta:

```
[
  {
    "cantidad_automoviles": 4,
    "sucursal_id": 4,
    "nombre_sucursal": "Sucursal D",
    "direccion": "Ruta Secundaria 101"
  },
  {
    "cantidad_automoviles": 3,
    "sucursal_id": 1,
    "nombre_sucursal": "Sucursal A",
    "direccion": "Calle Principal 123"
  },
  {
    "cantidad_automoviles": 1,
    "sucursal_id": 5,
    "nombre_sucursal": "Sucursal E",
    "direccion": "Carretera Principal 987"
  },
  {
    "cantidad_automoviles": 2,
    "sucursal_id": 3,
    "nombre_sucursal": "Sucursal C",
    "direccion": "Plaza Principal 789"
  },
  {
    "cantidad_automoviles": 5,
    "sucursal_id": 2,
    "nombre_sucursal": "Sucursal B",
    "direccion": "Avenida Central 456"
  }
]
```