import { useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import { useNavigate } from 'react-router-dom';

import "simplebar-react/dist/simplebar.min.css";
import { sidebarStructure } from "./structure";
import { useAuth } from "../../hooks/useAuth";

import DashboardIcon  from './icons/dashboard.svg?react';
import CarrerasIcon  from './icons/carreras.svg?react';
import PeriodoIcon from './icons/periodo.svg?react';
import CalendarioIcon from './icons/calendario.svg?react';
import RegistroIcon from './icons/registro.svg?react';
import ConfiguracionIcon from './icons/configuracion.svg?react';
import CursosIcon from './icons/cursos.svg?react';
import CarreraIcon from './icons/carrera.svg?react';
import ChartIcon from './icons/chart.svg?react';
import EventoIcon from './icons/evento.svg?react';
import UsuariosIcon from './icons/usuarios.svg?react';
import ScreenIcon from './icons/screen.svg?react';
import LogoutIcon from './icons/logout.svg?react';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ setExpand }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAdmin = user?.username === 'administrator@emi.com';

  const username = "Escuela Militar de Ingenieria";
  const company = "Sistema de Asistencia";
  const profilePic =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyt2bFghSIns05i2If7gT2WuJuKXoBCPaJgA";
  const link = "/";

  const [openedMenu, setOpenedMenu] = useState({});
  const [activeName, setActiveName] = useState("");
  const activeLink = window.location.pathname;

  const listRef = useRef({});

  const [isExpand, setIsExpand] = useState(true);
  const [isExpandOnHover, setIsExpandOnHover] = useState(false);

  const handleHoverExpand = (value) => {
    if (!isExpand) {
      setIsExpandOnHover(value);
    }
  };

  const handleNavigate = ({ name, link }) => {
    setActiveName(name);
    navigate(link);
  };

  const handleToggle = (name) => {
    const rootEl = name.split(".")[0];

    if (openedMenu[name]?.open === true) {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: false,
          height: "0px"
        },
        [rootEl]: {
          open: rootEl === name ? false : true,
          height: `${(listRef.current[rootEl]?.scrollHeight || 0) -
            (listRef.current[name]?.scrollHeight || 0)
            }px`
        }
      }));
    } else {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: true,
          height: `${listRef.current[name]?.scrollHeight || 0}px`
        },
        [rootEl]: {
          open: true,
          height: `${(listRef.current[rootEl]?.scrollHeight || 0) +
            (listRef.current[name]?.scrollHeight || 0)
            }px`
        }
      }));
    }
  };

  const generateIcon = (icon) => {
    var icons_map = {};

    icons_map["dasbor"] = <DashboardIcon className="h-5 w-5 text-current" />;
    icons_map["carreras"] = <CarrerasIcon className="h-5 w-5 text-current"  />;
    icons_map["periodo"] = <PeriodoIcon className="h-5 w-5 text-current"  />;
    icons_map["calendario"] = <CalendarioIcon className="h-5 w-5 text-current"  />;
    icons_map["estudiantes"] = <RegistroIcon className="h-5 w-5 text-current"  />;
    icons_map["configuracion"] = <ConfiguracionIcon className="h-5 w-5 text-current"  />;
    icons_map["cursos"] = <CursosIcon className="h-5 w-5 text-current" />
    icons_map["carrera"] = <CarreraIcon className="h-5 w-5 text-current" />
    icons_map["chart"] = <ChartIcon className="h-5 w-5 text-current" />
    icons_map["evento"] = <EventoIcon className="h-5 w-5 text-current" />
    icons_map["usuarios"] = <UsuariosIcon className="h-5 w-5 text-current" />
    icons_map["control"] = <ScreenIcon className="h-5 w-5 text-current" />
    icons_map["logout"] = <LogoutIcon className="h-5 w-5 text-current" />
    return icons_map[icon];
  };

  const generateMenu = (item, index, recursive = 0) => {
    if (activeName === "" && activeLink.includes(item.link)) {
      setActiveName(item.name);
    }
    const classesActive = activeName === item.name ? "active" : "";

    if (item.isAdmin && !isAdmin) {
      return null;
    }

    return (
      <li key={index}>
        <a
          role="button"
          tabIndex={0}
          id={item.id}
          onClick={() => {
            if (item.logout) {
              logout();
              return;
            }

            if ("child" in item) {
              handleToggle(item.name);
            } else if ("link" in item) {
              handleNavigate(item);
            }
          }}
          onKeyDown={(event) => {
            const { code } = event;
            if (code === "Space") {
              if ("child" in item) {
                handleToggle(item.name);
              } else if ("link" in item) {
                handleNavigate(item);
              }
            }
          }}
          className={[
            "group m-0 flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1 focus:outline-none",
            recursive === 0 ? "pl-4" : recursive === 1 ? "pl-11" : "pl-16",
            activeName === item.name || activeName.split(".")[0] === item.name
              ? `text-blue-600 font-semibold ${item.parent ? "bg-blue-200/20 " : "bg-transparent"
              }`
              : `text-slate-500 ${item.parent && ""}`,
            "hover:bg-slate-300/20",
            classesActive
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            {item.icon ? (
              item.icon === "dot" ? (
                <div className="h-3 w-3 flex items-center justify-center">
                  <div
                    className={[
                      `${classesActive ? "h-2 w-2" : "h-1 w-1"}`,
                      "bg-current rounded-full duration-200"
                    ].join(" ")}
                  ></div>
                </div>
              ) : (
                generateIcon(item.icon)
                // <DashboardIcon />
              )
            ) : null}
            <div
              className={`truncate ${isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                }`}
                style={{ color: 'white' }}
            >
              {item.title}
            </div>
          </div>
          {"child" in item ? (
            <div
              className={`${isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            false
          )}
        </a>
        {"child" in item ? (
          <ul
            ref={(el) => (listRef.current[item.name] = el)}
            className={[
              "overflow-hidden duration-300 ease-in-out",
              isExpand ? "" : isExpandOnHover ? "" : "h-0"
            ].join(" ")}
            style={{ maxHeight: `${openedMenu[item.name]?.height || "0px"}` }}
            key={item.name}
          >
            {item.child.map((value, idx) =>
              generateMenu(value, idx, recursive + 1)
            )}
          </ul>
        ) : (
          false
        )}
      </li>
    );
  };

  return (
    <nav
      role="navigation"
      className={[
        "bg-slate-50 border-r border-slate-100 shadow-sm absolute inset-y-0 left-0",
        "duration-300 ease-in-out md:fixed md:translate-x-0",
        `${isExpand
          ? "bg-slate-50 w-72"
          : isExpandOnHover
            ? "bg-slate-50/70 w-72 backdrop-blur-md"
            : "bg-slate-50 w-20"
        }`
      ].join(" ")}
    >
      <button
        className="absolute z-50 top-16 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-black"
        onClick={() => {
          setIsExpand(!isExpand);
          setExpand(!isExpand);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${isExpand ? "rotate-0" : "rotate-180"
            } transform duration-500 h-4 w-4`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        onMouseEnter={() => handleHoverExpand(true)}
        onMouseLeave={() => handleHoverExpand(false)}
        className={`relative h-screen overflow-hidden`}
      >
        <SimpleBar style={{ height: "100%", backgroundColor: '#003f8a', color: 'white' }} autoHide timeout={100}>
          <div className="text-slate-500">
            <div className="my-8 flex flex-col items-center h-44 overflow-x-hidden">
              <a
                href={link}
                className={`text-center flex flex-col items-center justify-center`}
              >
                <div
                  className={`rounded-full border-4 border-white overflow-hidden duration-300 ${isExpand
                      ? "h-28 w-28"
                      : isExpandOnHover
                        ? "h-28 w-28"
                        : "h-12 w-12"
                    }`}
                >
                  <img src={profilePic} className="block" alt="" />
                </div>
                <div
                  className={`text-base font-semibold mt-3 truncate duration-300 text-white ${isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                    }`}
                >
                  {username}
                </div>
                <div
                  className={`duration-300 text-sm truncate text-white ${isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                    }`}
                >
                  {company}
                </div>
              </a>
            </div>

            <div className="mt-3 mb-10 p-0">
              <ul className="list-none text-sm font-normal px-3">
                {sidebarStructure.map((item, index) =>
                  generateMenu(item, index)
                )}
              </ul>
            </div>
          </div>
        </SimpleBar>
      </div>
    </nav>
  );
};

export default Sidebar;
