/// <reference types="vite/client" />

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "@fontsource-variable/inter" {
  const content: any;
  export default content;
}
