
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
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
          "init": "INIT";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          
        };
        matchesStates: "closed" | "idle" | "opened" | "opened.activity" | "opened.panel" | "opened.panel.closed" | "opened.panel.idle" | "opened.panel.opened" | { "opened"?: "activity" | "panel" | { "panel"?: "closed" | "idle" | "opened"; }; };
        tags: never;
      }
  