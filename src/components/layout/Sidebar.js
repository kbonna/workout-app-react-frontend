import React from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import LinkHighlighedIfMatch from "../hoc/LinkHighlighedIfMatch";
import routes from "utilities/routes";
import { useFlags } from "components/context/FlagsProvider";

function Sidebar() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const { flags } = useFlags();

  return (
    <div
      className={`sidebar sidebar--${
        flags.isSidebarOpen ? "opened" : "closed"
      }`}
    >
      <ul className="sidebar__list">
        <li className="sidebar__list-item">
          <LinkHighlighedIfMatch
            classNameBase="sidebar__link"
            classNameActive="sidebar__link--active"
            location={location}
            to={`${url}/dashboard`}
          >
            Dashboard
          </LinkHighlighedIfMatch>
        </li>
        <li className="sidebar__list-item">
          <LinkHighlighedIfMatch
            classNameBase="sidebar__link"
            classNameActive="sidebar__link--active"
            location={location}
            to={`${url}/inbox/`}
          >
            Inbox
          </LinkHighlighedIfMatch>
        </li>
        <li className="sidebar__list-item-separator">Training</li>
        <li className="sidebar__list-item">
          <LinkHighlighedIfMatch
            classNameBase="sidebar__link"
            classNameActive="sidebar__link--active"
            location={location}
            to={routes.app.exercises.myExercises}
            matchActive={`${url}/exercises`}
          >
            Exercises
          </LinkHighlighedIfMatch>
        </li>
        <li className="sidebar__list-item">
          <LinkHighlighedIfMatch
            classNameBase="sidebar__link"
            classNameActive="sidebar__link--active"
            location={location}
            to={`${url}/routines`}
          >
            Routines
          </LinkHighlighedIfMatch>
        </li>
        <li className="sidebar__list-item">
          <LinkHighlighedIfMatch
            classNameBase="sidebar__link"
            classNameActive="sidebar__link--active"
            location={location}
            to={`${url}/workouts`}
          >
            Workouts
          </LinkHighlighedIfMatch>
        </li>
        <li className="sidebar__list-item-separator">Analytics</li>
        <li className="sidebar__list-item">
          <LinkHighlighedIfMatch
            classNameBase="sidebar__link"
            classNameActive="sidebar__link--active"
            location={location}
            to={`${url}/samples`}
          >
            Samples
          </LinkHighlighedIfMatch>
        </li>
        <li className="sidebar__list-item">
          <LinkHighlighedIfMatch
            classNameBase="sidebar__link"
            classNameActive="sidebar__link--active"
            location={location}
            to={`${url}/statistics`}
          >
            Statistics
          </LinkHighlighedIfMatch>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
