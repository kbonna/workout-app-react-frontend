import { Link } from "react-router-dom";
import React from "react";

/*
 * Component wrapping Link component from react-router. It automatically apply
 * classNameActive if current location (URL) is matching location that it is
 * pointing to. Used to represent menu links that are highlighed whenever
 * specific tab / page is currently active. If matchActive prop is specified
 * classNameActive is applied whenever current location is descendant of
 * matchActive location.
 */
function LinkHighlighedIfMatch({
  children,
  location,
  classNameBase,
  classNameActive,
  matchActive,
  ...rest
}) {
  const { to: toUrl } = rest;
  let className = classNameBase;

  if (matchActive) {
    if (location.pathname.includes(matchActive)) {
      className += ` ${classNameActive}`;
    }
  } else {
    if (location.pathname === toUrl) {
      className += ` ${classNameActive}`;
    }
  }

  return (
    <Link className={className} to={toUrl} {...rest}>
      {children}
    </Link>
  );
}

export default LinkHighlighedIfMatch;

LinkHighlighedIfMatch.defaultProps = {
  matchActive: null,
};
