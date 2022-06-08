// import original module declarations
import "solid-styled-components";

// and extend them!
declare module "solid-styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      white: string;
      black: string;
      grey: string;
      background: string;
    };
    fontFamily: string;
    horizontalPadding: string;
  }
}
