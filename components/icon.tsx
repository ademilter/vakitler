import { ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  icon: keyof typeof ICON_NAMES;
};

export default function Icon({ size = 32, icon, ...props }: IconProps) {
  const children: ReactNode = PATHS[icon];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      {...props}
    >
      {children}
    </svg>
  );
}

// bu ikon seti sadece vakitlere ait ikonları içeriyor
// diğer ikonları buraya EKLEMEyiniz
export enum ICON_NAMES {
  Imsak = "Imsak",
  Gunes = "Gunes",
  Ogle = "Ogle",
  Ikindi = "Ikindi",
  ruyet = "ruyet",
  r1 = "r1",
  r2 = "r2",
  r3 = "r3",
  r4 = "r4",
  r5 = "r5",
  ilkdordun = "ilkdordun",
  i1 = "i1",
  i2 = "i2",
  i3 = "i3",
  i4 = "i4",
  i5 = "i5",
  i6 = "i6",
  i7 = "i7",
  dolunay = "dolunay",
  d1 = "d1",
  d2 = "d2",
  d3 = "d3",
  d4 = "d4",
  d5 = "d5",
  d6 = "d6",
  d7 = "d7",
  sondordun = "sondordun",
  sd1 = "sd1",
  sd2 = "sd2",
  sd3 = "sd3",
  sd4 = "sd4",
  sd5 = "sd5",
  sd6 = "sd6",
  ictima = "ictima",
}

const PATHS = {
  [ICON_NAMES.Imsak]: (
    <>
      <circle opacity={0.1} cx={16} cy={16} r={9} fill="currentColor" />
      <path
        d="M30 16H2"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  [ICON_NAMES.Gunes]: (
    <>
      <path d="M25 25a9 9 0 0 0-18 0h18Z" fill="#fff" />
      <path
        d="M7 25a9 9 0 0 1 18 0H7ZM30 25H2M16 6v6m0-6-3 3m3-3 3 3"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.523 17.22a.8.8 0 0 1 1.093-.294l1.732 1a.8.8 0 0 1-.8 1.386l-1.732-1a.8.8 0 0 1-.293-1.093ZM8.22 11.523a.8.8 0 0 1 1.092.293l1 1.732a.8.8 0 0 1-1.386.8l-1-1.732a.8.8 0 0 1 .293-1.093ZM29.477 17.22a.8.8 0 0 1-.293 1.092l-1.732 1a.8.8 0 0 1-.8-1.386l1.732-1a.8.8 0 0 1 1.093.293ZM23.781 11.523a.8.8 0 0 1 .293 1.093l-1 1.732a.8.8 0 1 1-1.386-.8l1-1.732a.8.8 0 0 1 1.093-.293Z"
        fill="currentColor"
      />
    </>
  ),
  [ICON_NAMES.Ogle]: (
    <>
      <circle cx={16} cy={16} r={9} fill="#fff" />
      <circle
        cx={16}
        cy={16}
        r={9}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.8 1.238a.8.8 0 0 0-1.6 0v2a.8.8 0 1 0 1.6 0v-2Zm-1.6 29.526a.8.8 0 0 0 1.6 0v-2a.8.8 0 1 0-1.6 0v2ZM30.762 16.8a.8.8 0 0 0 0-1.6h-2a.8.8 0 1 0 0 1.6h2ZM1.236 15.2a.8.8 0 0 0 0 1.6h2a.8.8 0 1 0 0-1.6h-2ZM6.127 4.996a.8.8 0 1 0-1.131 1.132L6.41 7.542A.8.8 0 1 0 7.541 6.41L6.127 4.996Zm19.747 22.01a.8.8 0 0 0 1.131-1.132l-1.414-1.414a.8.8 0 0 0-1.132 1.131l1.415 1.414ZM27.004 6.127a.8.8 0 0 0-1.132-1.13L24.458 6.41a.8.8 0 0 0 1.132 1.132l1.414-1.415ZM4.996 25.873a.8.8 0 0 0 1.131 1.131l1.415-1.414a.8.8 0 1 0-1.132-1.132l-1.414 1.415Z"
        fill="currentColor"
      />
    </>
  ),
  [ICON_NAMES.Ikindi]: (
    <>
      <circle opacity={0.1} cx={16} cy={16} r={9} fill="currentColor" />
      <circle
        cx={16}
        cy={16}
        r={9}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g
        opacity={0.2}
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      >
        <path d="M16.8 1.238a.8.8 0 0 0-1.6 0v1a.8.8 0 1 0 1.6 0v-1Zm-1.6 29.526a.8.8 0 0 0 1.6 0v-1a.8.8 0 1 0-1.6 0v1ZM30.762 16.8a.8.8 0 0 0 0-1.6h-1a.8.8 0 1 0 0 1.6h1ZM1.236 15.2a.8.8 0 0 0 0 1.6h1a.8.8 0 0 0 0-1.6h-1ZM6.127 4.996a.8.8 0 1 0-1.131 1.132l.707.707a.8.8 0 1 0 1.131-1.132l-.707-.707Zm19.747 22.01a.8.8 0 1 0 1.131-1.132l-.707-.707a.8.8 0 0 0-1.131 1.131l.707.707ZM27.004 6.127a.8.8 0 0 0-1.132-1.13l-.707.706a.8.8 0 0 0 1.132 1.132l.707-.708ZM4.996 25.873a.8.8 0 0 0 1.131 1.131l.708-.707a.8.8 0 0 0-1.132-1.131l-.707.707Z" />
      </g>
    </>
  ),
  [ICON_NAMES.ruyet]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.138 25.771C21.026 23.94 23 20.251 23 16c0-4.252-1.974-7.94-4.862-9.77C22.634 7.207 26 11.21 26 16c0 4.79-3.366 8.792-7.862 9.771Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.r1]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.155 25.934C20.02 24.165 22 20.382 22 16s-1.98-8.165-4.845-9.934C22.134 6.638 26 10.868 26 16s-3.866 9.361-8.845 9.934Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.r2]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.347 25.994C19.094 24.252 21 20.432 21 16c0-4.432-1.906-8.252-4.653-9.994C21.709 6.189 26 10.593 26 16s-4.291 9.811-9.653 9.994Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.r3]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.638 25.994C18.213 24.25 20 20.432 20 16c0-4.432-1.787-8.251-4.362-9.994.12-.004.24-.006.362-.006 5.523 0 10 4.477 10 10s-4.477 10-10 10c-.121 0-.242-.002-.362-.006Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.r4]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.99 25.95C17.36 24.188 19 20.395 19 16s-1.64-8.188-4.01-9.95c.332-.033.669-.05 1.01-.05 5.523 0 10 4.477 10 10s-4.477 10-10 10c-.341 0-.678-.017-1.01-.05Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.r5]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.375 25.869C16.523 24.073 18 20.329 18 16s-1.477-8.073-3.625-9.869A10.07 10.07 0 0 1 16 6c5.523 0 10 4.477 10 10s-4.477 10-10 10c-.553 0-1.096-.045-1.625-.131Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.ilkdordun]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 6a10 10 0 1 1 0 20V6Z" fill="#fff" />
    </>
  ),
  [ICON_NAMES.i1]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.625 6.131C22.375 6.908 26 11.031 26 16c0 4.97-3.625 9.092-8.375 9.869C15.477 24.073 14 20.329 14 16s1.477-8.073 3.625-9.869Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.i2]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.01 6.05C22.06 6.557 26 10.818 26 16c0 5.182-3.941 9.443-8.99 9.95C14.64 24.188 13 20.395 13 16s1.64-8.188 4.01-9.95Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.i3]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.362 6.006C21.717 6.196 26 10.598 26 16s-4.283 9.803-9.638 9.994C13.787 24.25 12 20.432 12 16c0-4.432 1.787-8.251 4.362-9.994Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.i4]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.653 25.994C12.906 24.252 11 20.432 11 16c0-4.432 1.906-8.252 4.653-9.994C10.291 6.189 6 10.593 6 16s4.291 9.811 9.653 9.994Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.i5]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.845 6.066C15.224 6.022 15.61 6 16 6c5.523 0 10 4.477 10 10s-4.477 10-10 10c-.39 0-.776-.022-1.155-.066C11.98 24.165 10 20.382 10 16s1.98-8.165 4.845-9.934Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.i6]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.862 6.23C14.55 6.078 15.266 6 16 6c5.523 0 10 4.477 10 10s-4.477 10-10 10c-.734 0-1.45-.079-2.138-.229C10.974 23.94 9 20.251 9 16c0-4.252 1.973-7.94 4.862-9.77Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.i7]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.545 6.613A9.98 9.98 0 0 1 16 6c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.981 9.981 0 0 1-3.455-.613C9.819 23.454 8 19.973 8 16c0-3.973 1.819-7.454 4.545-9.387Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.dolunay]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={16} cy={16} r={10} fill="#fff" />
    </>
  ),
  [ICON_NAMES.d1]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.455 25.387C22.181 23.454 24 19.973 24 16c0-3.973-1.819-7.454-4.545-9.387A9.98 9.98 0 0 0 16 6C10.477 6 6 10.477 6 16s4.477 10 10 10a9.98 9.98 0 0 0 3.455-.613Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.d2]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.138 25.77C21.026 23.94 23 20.253 23 16s-1.974-7.94-4.862-9.77C17.449 6.078 16.734 6 16 6 10.477 6 6 10.477 6 16s4.477 10 10 10c.734 0 1.45-.079 2.138-.23Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.d3]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.155 25.934C20.02 24.165 22 20.382 22 16s-1.98-8.165-4.845-9.934A10.105 10.105 0 0 0 16 6C10.477 6 6 10.477 6 16s4.477 10 10 10c.39 0 .776-.022 1.155-.066Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.d4]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.347 25.994C19.094 24.252 21 20.432 21 16c0-4.432-1.906-8.252-4.653-9.994C16.232 6.002 16.117 6 16 6 10.477 6 6 10.477 6 16s4.477 10 10 10c.116 0 .232-.002.347-.006Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.d5]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.638 25.994C18.213 24.25 20 20.432 20 16c0-4.432-1.787-8.251-4.362-9.994C10.283 6.196 6 10.598 6 16s4.283 9.803 9.638 9.994Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.d6]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.99 25.95C17.36 24.188 19 20.395 19 16s-1.64-8.188-4.01-9.95C9.94 6.557 6 10.818 6 16c0 5.182 3.941 9.443 8.99 9.95Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.d7]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.375 25.869C16.523 24.073 18 20.329 18 16s-1.477-8.073-3.625-9.869C9.625 6.908 6 11.031 6 16c0 4.97 3.625 9.092 8.375 9.869Z"
        fill="#fff"
      />
    </>
  ),

  [ICON_NAMES.sondordun]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 26a10 10 0 0 1 0-20v20Z" fill="#fff" />
    </>
  ),
  [ICON_NAMES.sd1]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.626 25.869C15.477 24.073 14 20.329 14 15.999c0-4.328 1.477-8.072 3.625-9.868A10.07 10.07 0 0 0 16 6C10.477 6 6 10.477 6 16s4.477 10 10 10c.553 0 1.097-.045 1.626-.131Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.sd2]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.011 25.95C14.641 24.188 13 20.395 13 16s1.64-8.188 4.01-9.95A10.12 10.12 0 0 0 16 6C10.477 6 6 10.477 6 16s4.477 10 10 10c.341 0 .679-.017 1.011-.05Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.sd3]: (
    <>
      {" "}
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.362 25.994C13.787 24.252 12 20.432 12 16c0-4.432 1.787-8.251 4.361-9.994C16.241 6.002 16.121 6 16 6 10.477 6 6 10.477 6 16s4.477 10 10 10c.121 0 .242-.002.362-.006Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.sd4]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.654 25.994C12.907 24.252 11 20.432 11 16c0-4.432 1.906-8.252 4.653-9.994C10.29 6.189 6 10.593 6 16s4.291 9.811 9.654 9.994Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.sd5]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.846 25.934C11.98 24.166 10 20.382 10 16s1.98-8.165 4.845-9.934C9.866 6.639 6 10.868 6 16s3.867 9.362 8.846 9.934Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.sd6]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.862 25.771C10.974 23.94 9 20.251 9 16c0-4.252 1.973-7.94 4.861-9.77C9.366 7.207 6 11.21 6 16c0 4.79 3.367 8.792 7.862 9.771Z"
        fill="#fff"
      />
    </>
  ),
  [ICON_NAMES.ictima]: (
    <>
      <circle
        cx={16}
        cy={16}
        r={10.8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};
