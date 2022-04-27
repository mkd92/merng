import * as React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBarNew() {
  const pathname = useLocation().pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);

  const activeItem = path;

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" name="home">
            <div className={`btn btn-ghost  normal-case text-xl`}>daisyUI</div>
          </Link>
        </div>
        <div className="flex-none p-0">
          <ul className="menu menu-horizontal ">
            <li>
              <Link to="/login" className="p-0 m-0 rounded-full " name="login">
                <div
                  className={` btn  btn-ghost ${
                    activeItem === "login" ? "btn-active" : ""
                  } normal-case text-xl`}
                >
                  Login
                </div>
              </Link>
              <Link
                to="/register"
                className="p-0 m-0 rounded-full"
                name="login"
              >
                <div
                  className={`btn btn-ghost ${
                    activeItem === "register" ? "btn-active" : ""
                  } normal-case text-xl`}
                >
                  Register
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
