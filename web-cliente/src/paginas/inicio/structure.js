const sidebarStructure = [
  {
    id: "reportes",
    title: "Reportes",
    name: "dashboard",
    parent: true,
    icon: "dasbor",
    child: [
      {
        id: "dashboard",
        title: "Dashboard",
        name: "reportes.dashboard",
        link: "/reportes/dashboard",
        icon: "chart"
      },
      {
        id: "ingresos-carrera",
        title: "Registros por Carrera",
        name: "reportes.ingresos-carrera",
        link: "/reportes/registros-carrera",
        icon: "carrera"
      },
      {
        id: "ingresos-eventos",
        title: "Registros por Eventos",
        name: "reportes.ingresos-eventos",
        link: "/reportes/registros-evento",
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
    link: "/carreras"
  },
  {
    id: 'periodo',
    title: 'Periodos Academicos',
    name: 'periodos',
    parent: true,
    icon: 'periodo',
    link: "/periodos"
  },
  {
    id: 'cursos',
    title: 'Cursos',
    name: 'cursos',
    parent: true,
    icon: 'cursos',
    link: "/cursos"
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
  // {
  //   id: 'configuracion',
  //   title: 'Registro RFID',
  //   name: 'rfid',
  //   parent: true,
  //   icon: 'configuracion',
  //   link: "/rfid"
  // },
]

export { sidebarStructure };
