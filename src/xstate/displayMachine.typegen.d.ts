
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.init": { type: "xstate.init" };
"xstate.stop": { type: "xstate.stop" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "setSize": "" | "xstate.stop";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "landscapePrimary": "";
"landscapeSecondary": "";
"lg": "";
"md": "";
"portraitPrimary": "";
"portraitSecondary": "";
"sm": "";
"xl": "";
"xxl": "";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "orientation" | "orientation.init" | "orientation.landscapePrimary" | "orientation.landscapeSecondary" | "orientation.portraitPrimary" | "orientation.portraitSecondary" | "size" | "size.init" | "size.lg" | "size.md" | "size.sm" | "size.xl" | "size.xxl" | { "orientation"?: "init" | "landscapePrimary" | "landscapeSecondary" | "portraitPrimary" | "portraitSecondary";
"size"?: "init" | "lg" | "md" | "sm" | "xl" | "xxl"; };
        tags: "4k" | "desktop" | "landscape" | "pad" | "phone" | "portrait" | "tv";
      }
  