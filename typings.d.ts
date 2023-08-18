declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.mp3';
declare module '*.svg' {
  export function ReactComponent(
    // eslint-disable-next-line no-unused-vars
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
}

interface Window {
  ga: string;
}
