# 💻 Proyecto InterIT - FrontEnd


## Tabla de Contenidos

- [💻 Proyecto InterIT - FrontEnd](#-proyecto-interit---frontend)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Descripción del Proyecto](#descripción-del-proyecto)
  - [Tecnologías utilizadas](#tecnologías-utilizadas)
  - [Tecnologías Utilizadas en el Frontend](#tecnologías-utilizadas-en-el-frontend)
  - [Documentación Técnica](#documentación-técnica)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación y Configuración](#instalación-y-configuración)
  - [Comandos Disponibles](#comandos-disponibles)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Arquitectura](#arquitectura)
    - [Principales componentes de la arquitectura:](#principales-componentes-de-la-arquitectura)
  - [Uso de Docker](#uso-de-docker)
    - [Construcción de la imagen Docker:](#construcción-de-la-imagen-docker)
    - [Ejecución del contenedor Docker:](#ejecución-del-contenedor-docker)
  - [Estado del Proyecto](#estado-del-proyecto)
  - [Colaboradores del Proyecto](#colaboradores-del-proyecto)
  - [Contribuciones](#contribuciones)
  - [Licencia](#licencia)

## Descripción del Proyecto

Este es el frontend de la aplicación **front_alfa**, una plataforma que conecta empresas con aplicantes de empleo. La aplicación permite a las empresas publicar ofertas de trabajo y a los candidatos postularse y comunicarse con ellas de forma directa. Este frontend está desarrollado utilizando tecnologías modernas como React, Redux y TypeScript, proporcionando una experiencia de usuario rápida y escalable.

## Tecnologías utilizadas

Claro, aquí tienes la sección de tecnologías utilizadas en el **frontend** con los badges y las versiones correspondientes:

---

## Tecnologías Utilizadas en el Frontend

El frontend de esta aplicación está construido con tecnologías modernas que aseguran una experiencia de usuario rápida y eficiente. A continuación, se listan las principales tecnologías utilizadas junto con sus versiones:

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) **v18.3.1**: Biblioteca para construir interfaces de usuario como Single Page Application (SPA).
- ![Redux & Redux Toolkit](https://img.shields.io/badge/redux-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white) **v2.2.6**: Gestión del estado de la aplicación.
- ![React Router](https://img.shields.io/badge/react_router-%23CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white) **v6.25.1**: Navegación entre diferentes vistas y componentes.
- ![Axios](https://img.shields.io/badge/axios-%235A29E4.svg?style=for-the-badge&logo=axios&logoColor=white) **v1.7.3**: Realización de peticiones HTTP al backend.
- ![i18next](https://img.shields.io/badge/i18next-%231D2434.svg?style=for-the-badge&logo=i18next&logoColor=white) **v23.14.0**: Internacionalización para permitir que la aplicación soporte múltiples idiomas.
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) **v5.3.4**: Herramienta de desarrollo y construcción para una mayor velocidad de desarrollo.
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) **v5.2.2**: Lenguaje de programación con tipado estático que añade robustez al código.
- ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff&style=for-the-badge) **v2.0.4**: Framework de testing utilizado para pruebas unitarias.
- ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) **v8.57.0**: Herramienta para la verificación del código, asegurando un código limpio y consistente.


## Documentación Técnica

Puedes encontrar más detalles sobre las tecnologías y módulos utilizados en este proyecto en la siguiente documentación:

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [Vite Documentation](https://vitejs.dev/guide/)


## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes software en tu entorno de desarrollo:

- [Node.js](https://nodejs.org/) (v14.0.0 o superior)
- [npm](https://www.npmjs.com/) (v6.0.0 o superior)



## Instalación y Configuración

Para empezar con el desarrollo de este proyecto, sigue los pasos a continuación:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/usuario/front_alfa.git
   cd front_alfa
   ```

2. **Instalar dependencias**:
   Asegúrate de tener Node.js instalado. Luego, ejecuta el siguiente comando:
   ```bash
   npm install
   ```

3. **Variables de entorno**:
   Debes configurar las variables de entorno en un archivo `.env` en la raíz del proyecto, siguiendo el formato de `.env.example`. Las variables clave incluyen:
   - `VITE_API_URL`: URL base para las peticiones a la API del backend.
   - `VITE_API_VERSION`: Versión de la API.

## Comandos Disponibles

- **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Este comando ejecuta el servidor de desarrollo de Vite y lanza la aplicación en el navegador.

- **Compilar el proyecto**:
   ```bash
   npm run build
   ```
   Construye la aplicación para producción.

- **Previsualizar la build**:
   ```bash
   npm run preview
   ```

- **Linting**:
   ```bash
   npm run lint
   ```
   Ejecuta ESLint para analizar el código en busca de errores.

- **Formatear el código**:
   ```bash
   npm run format
   ```
   Ejecuta Prettier para formatear automáticamente el código.

- **Ejecutar pruebas**:
   ```bash
   npm run test
   ```

## Estructura del Proyecto

A continuación, se muestra una visión general de la estructura del proyecto:

```
├── public/               # Archivos estáticos
├── src/
│   ├── components/       # Componentes React reutilizables
│   ├── pages/            # Páginas individuales (Home, About, etc.)
│   ├── store/            # Configuración de Redux (acciones, reducers)
│   ├── App.tsx           # Punto de entrada principal de la aplicación
│   ├── main.tsx          # Punto de montaje de React
│   ├── router.tsx        # Configuración de rutas con React Router
│   └── i18n.ts           # Configuración de i18n para la internacionalización
├── .env.example          # Ejemplo de configuración de variables de entorno
├── package.json          # Dependencias y scripts del proyecto
└── vite.config.ts        # Configuración de Vite
```

## Arquitectura

El frontend de la aplicación sigue una arquitectura **modular y escalable** basada en componentes React. La lógica de la aplicación está manejada por Redux para la gestión del estado, mientras que las vistas y páginas se organizan mediante React Router. 

### Principales componentes de la arquitectura:
- **SPA con React**: Todo el frontend se maneja en una sola página, con enrutamiento dinámico para navegar entre distintas secciones.
- **Redux para gestión de estado**: La centralización del estado con Redux garantiza que la información fluya de manera eficiente entre los componentes de la aplicación.
- **Internacionalización con i18next**: El soporte multilingüe está integrado mediante i18next, lo que permite cambiar el idioma de forma dinámica.

## Uso de Docker

Este proyecto incluye un archivo `Dockerfile` que permite construir y desplegar la aplicación en un entorno de contenedores.

### Construcción de la imagen Docker:
```bash
docker build -t front_alfa .
```

### Ejecución del contenedor Docker:
```bash
docker run -p 80:80 front_alfa
```

Esto ejecutará la aplicación en el puerto 80 utilizando Nginx como servidor web.

## Estado del Proyecto

Este proyecto está en **desarrollo activo**. Próximas características incluyen mejoras en la interfaz de usuario y nuevas funcionalidades para la administración de usuarios.


## Colaboradores del Proyecto

Este proyecto ha sido desarrollado en su totalidad por el equipo The Goot Team, en el marco del Bootcamp de Desarrollo Web Fullstack (Edicion XVI de la escuela [KeepCoding](https://keepcoding.io))

- Ivette Farre - https://github.com/Iv3tt3
- Carles Espuñes - https://github.com/Cespuess
- Marta Vilaseca - https://github.com/marta-vilaseca
- David Arraras - https://github.com/Darrlop
- Syra Dominguez - https://github.com/SyraDominguez

## Contribuciones

Para contribuir a este proyecto:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube los cambios a tu repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request para revisión.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para obtener más detalles.
