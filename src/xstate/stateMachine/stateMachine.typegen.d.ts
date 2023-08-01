
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.canvas": { type: "done.invoke.canvas"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.display": { type: "done.invoke.display"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.html": { type: "done.invoke.html"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.sideBarLeft": { type: "done.invoke.sideBarLeft"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.sideBarRight": { type: "done.invoke.sideBarRight"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.canvas": { type: "error.platform.canvas"; data: unknown };
"error.platform.display": { type: "error.platform.display"; data: unknown };
"error.platform.html": { type: "error.platform.html"; data: unknown };
"error.platform.sideBarLeft": { type: "error.platform.sideBarLeft"; data: unknown };
"error.platform.sideBarRight": { type: "error.platform.sideBarRight"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "display": "done.invoke.display";
"layoutCanvas": "done.invoke.canvas";
"layoutHtml": "done.invoke.html";
"sideBarLeft": "done.invoke.sideBarLeft";
"sideBarRight": "done.invoke.sideBarRight";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "display": "xstate.init";
"layoutCanvas": "xstate.init";
"layoutHtml": "xstate.init";
"sideBarLeft": "xstate.init";
"sideBarRight": "xstate.init";
        };
        matchesStates: "display" | "layout" | "sideBarLeft" | "sideBarRight";
        tags: never;
      }
  