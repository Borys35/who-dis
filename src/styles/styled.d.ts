// import original module declarations
import "solid-styled-components";
import { BpType, MqType } from "./theme";

// and extend them!
declare module "solid-styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      white: string;
      black: string;
      grey: string;
      background: string;
      message: string;
    };
    fontFamily: string;
    horizontalPadding: string;
    bp: BpType;
    mq: MqType;
  }
}
