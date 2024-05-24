const sidebarStructure = [
  {
    id: 'usuarios',
    title: 'Usuarios',
    name: 'usuarios',
    parent: true,
    icon: 'usuarios',
    link: "/usuarios",
    isAdmin: true,
  },
  {
    id: 'permisos',
    title: 'Permisos',
    name: 'permisos',
    parent: true,
    icon: 'permiso',
    link: "/permisos",
    isAdmin: true,
  },
  {
    id: "reportes",
    title: "Reportes",
    name: "dashboard",
    parent: true,
    icon: "dasbor",
    child: [
      {
        id: "dashboard",
        title: "Estadisticas",
        name: "reportes.dashboard",
        link: "/reportes-dashboard",
        icon: "chart"
      },
      {
        id: "ingresos-carrera",
        title: "Detalle por Carrera",
        name: "reportes.ingresos-carrera",
        link: "/reportes-registros-carrera",
        icon: "carrera"
      },
      {
        id: "ingresos-eventos",
        title: "Detalle por Evento",
        name: "reportes.ingresos-eventos",
        link: "/reportes-registros-evento",
        icon: "evento"
      }
    ]
  },
  {
    id: 'carreras',
    title: 'Carreras',
    name: 'carreras',
    parent: true,
    icon: 'carreras',
    link: "/carreras",
    isAdmin: true,
  },
  {
    id: 'periodo',
    title: 'Periodos Academicos',
    name: 'periodos',
    parent: true,
    icon: 'periodo',
    link: "/periodos",
    isAdmin: true,
  },
  {
    id: 'cursos',
    title: 'Cursos',
    name: 'cursos',
    parent: true,
    icon: 'cursos',
    link: "/cursos",
    isAdmin: false,
  },
  {
    id: 'calendario',
    title: 'Calendario',
    name: 'calendario',
    parent: true,
    icon: 'calendario',
    link: "/calendario"
  },
  {
    id: 'estudiantes',
    title: 'Estudiantes',
    name: 'estudiantes',
    parent: true,
    icon: 'estudiantes',
    link: "/estudiantes"
  },
  {
    id: 'licencias',
    title: 'Licencias',
    name: 'licencias',
    parent: true,
    icon: 'licencias',
    link: "/licencias"
  },
  {
    id: 'control',
    title: 'Control',
    name: 'control',
    parent: true,
    icon: 'control',
    link: "/control",
    isAdmin: true,
  },
  {
    id: 'logout',
    title: 'Salir',
    name: 'logout',
    logout: true,
    parent: true,
    icon: 'logout',
  },
]

export { sidebarStructure };
