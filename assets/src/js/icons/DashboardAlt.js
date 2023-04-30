import * as React from "react";

function SvgDashboardAlt(props) {
  return (
    <svg
      fill="#d3d3d3"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      className="dashboard-alt_svg__icon dashboard-alt_svg__glyph"
      {...props}
    >
      <path d="M14 10v12H4a2 2 0 01-2-2V10zM22 10v10a2 2 0 01-2 2h-4V10zM22 4v4H2V4a2 2 0 012-2h16a2 2 0 012 2z" />
    </svg>
  );
}

export default SvgDashboardAlt;
