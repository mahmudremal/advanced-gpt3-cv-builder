import * as React from "react";

function SvgTeams(props) {
  return (
    <svg width={800} height={800} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M19 13.903c0-.499.404-.903.903-.903h11.194c.499 0 .903.404.903.903V20.5a6.5 6.5 0 11-13 0v-6.597z"
        fill="url(#teams_svg__paint0_linear_87_7777)"
      />
      <path
        d="M9 12.226C9 11.549 9.549 11 10.226 11h13.548c.677 0 1.226.549 1.226 1.226V22a8 8 0 11-16 0v-9.774z"
        fill="url(#teams_svg__paint1_linear_87_7777)"
      />
      <circle cx={27} cy={8} r={3} fill="#34439E" />
      <circle
        cx={27}
        cy={8}
        r={3}
        fill="url(#teams_svg__paint2_linear_87_7777)"
      />
      <circle
        cx={18}
        cy={6}
        r={4}
        fill="url(#teams_svg__paint3_linear_87_7777)"
      />
      <mask
        id="teams_svg__a"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={9}
        y={0}
        width={16}
        height={30}
      >
        <path
          d="M17 10a5 5 0 100-10 5 5 0 000 10z"
          fill="url(#teams_svg__paint4_linear_87_7777)"
        />
        <path
          d="M10.226 11C9.549 11 9 11.549 9 12.226V22a8 8 0 1016 0v-9.774c0-.677-.549-1.226-1.226-1.226H10.226z"
          fill="url(#teams_svg__paint5_linear_87_7777)"
        />
      </mask>
      <g mask="url(#teams_svg__a)">
        <path
          d="M7 12a3 3 0 013-3h7a3 3 0 013 3v12a3 3 0 01-3 3H7V12z"
          fill="#000"
          fillOpacity={0.3}
        />
      </g>
      <rect
        y={7}
        width={18}
        height={18}
        rx={2}
        fill="url(#teams_svg__paint6_linear_87_7777)"
      />
      <path d="M13 11H5v1.835h2.995V21h2.01v-8.165H13V11z" fill="#fff" />
      <defs>
        <linearGradient
          id="teams_svg__paint0_linear_87_7777"
          x1={19}
          y1={13.737}
          x2={32.159}
          y2={22.335}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#364088" />
          <stop offset={1} stopColor="#6E7EE1" />
        </linearGradient>
        <linearGradient
          id="teams_svg__paint1_linear_87_7777"
          x1={9}
          y1={19.404}
          x2={25}
          y2={19.404}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#515FC4" />
          <stop offset={1} stopColor="#7084EA" />
        </linearGradient>
        <linearGradient
          id="teams_svg__paint2_linear_87_7777"
          x1={24}
          y1={5.316}
          x2={29.796}
          y2={9.395}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#364088" />
          <stop offset={1} stopColor="#6E7EE1" />
        </linearGradient>
        <linearGradient
          id="teams_svg__paint3_linear_87_7777"
          x1={15.143}
          y1={3.143}
          x2={20.286}
          y2={9.143}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4858AE" />
          <stop offset={1} stopColor="#4E60CE" />
        </linearGradient>
        <linearGradient
          id="teams_svg__paint4_linear_87_7777"
          x1={13.429}
          y1={1.429}
          x2={19.857}
          y2={8.929}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4858AE" />
          <stop offset={1} stopColor="#4E60CE" />
        </linearGradient>
        <linearGradient
          id="teams_svg__paint5_linear_87_7777"
          x1={13.429}
          y1={1.429}
          x2={19.857}
          y2={8.929}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4858AE" />
          <stop offset={1} stopColor="#4E60CE" />
        </linearGradient>
        <linearGradient
          id="teams_svg__paint6_linear_87_7777"
          x1={0}
          y1={16}
          x2={18}
          y2={16}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A3887" />
          <stop offset={1} stopColor="#4C56B9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SvgTeams;
