import * as React from "react";

function SvgLoading(props) {
  return (
    <svg
      width={200}
      height={200}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <g transform="translate(82 50)">
        <circle r={6} fill="#283fcd">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-1.09375s"
            values="1 1.5;1 1"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
            values="1;0"
            begin="-1.09375s"
          />
        </circle>
      </g>
      <g transform="rotate(45 -51.355 123.983)">
        <circle r={6} fill="#283fcd" fillOpacity={0.875}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.9375s"
            values="1 1.5;1 1"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.9375s"
          />
        </circle>
      </g>
      <g transform="rotate(90 -16 66)">
        <circle r={6} fill="#283fcd" fillOpacity={0.75}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.78125s"
            values="1 1.5;1 1"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.78125s"
          />
        </circle>
      </g>
      <g transform="rotate(135 -1.355 41.983)">
        <circle r={6} fill="#283fcd" fillOpacity={0.625}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.625s"
            values="1 1.5;1 1"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.625s"
          />
        </circle>
      </g>
      <g transform="rotate(180 9 25)">
        <circle r={6} fill="#283fcd" fillOpacity={0.5}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.46875s"
            values="1 1.5;1 1"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.46875s"
          />
        </circle>
      </g>
      <g transform="rotate(-135 19.355 8.017)">
        <circle r={6} fill="#283fcd" fillOpacity={0.375}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.3125s"
            values="1 1.5;1 1"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.3125s"
          />
        </circle>
      </g>
      <g transform="rotate(-90 34 -16)">
        <circle r={6} fill="#283fcd" fillOpacity={0.25}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.15625s"
            values="1 1.5;1 1"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.15625s"
          />
        </circle>
      </g>
      <g transform="rotate(-45 69.355 -73.983)">
        <circle r={6} fill="#283fcd" fillOpacity={0.125}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="0s"
            values="1 1.5;1 1"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
            values="1;0"
            begin="0s"
          />
        </circle>
      </g>
    </svg>
  );
}

export default SvgLoading;
