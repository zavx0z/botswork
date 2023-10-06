import { createMachine } from "xstate";

export default createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgCUB5CgFQDoBRANXoDlqBtABgF1FQAHAPaxcAF1yD8fEAA9EAZgDsAVlqdFnAEwBORZoAsARk2HO2-QBoQAT0TGAvvatoseQkVojU-ADZgSLPQAGhw80kIi4pLScgiaAGzatPpKyobKmsoAHIpZ2pzxVrYI8ZqctNqV2vLyBpqKutqOzhg4BMS0mILeggCu+BC0kv6BIVy8SCARYhJSk7HxprTKuYZZ8ZzyacqlRYhZ6stG8fKcptrpDk4gLm3und1C-YOiAO6CJAAKZEzj4cIzaLzRCLcorLJrDZbdK7GyIFSKNTHBI6fT6ZT6RzXfCCCBwaS3NzEf6RWYxRAAWkM2j2CHkhmWnCZmwh+kSeni8WaN1aRI8Xl8YBJgLmoFi+kUtIxqiq2mUnH0nDyW2U3MJ7Q8XR6z2FUVFsgUNVoijWinkEqMJjMljhdPiiPRWU08hOiniaLZat5Goe2oGQ0IurJwLplWNpvNikt5xtxQaSTlWVOWSyyh22gSXtcPq1T39b0EQaBYvhS1T5k4acMCIhtIOmmS2Uy8dOpUx13V91zfXz2AATmAhZNpnryXSIeGcpHo9apWcKk3ajtqxL5Fm7h1u89aKJ+4PaOhRN1cJgi-rxWlaO6sikVLT4vLG0n5NUzfV1Ou+b68y892BaHgsBHn2xQCACo4hik8hXvoN7osY1TmMo8i0hoWQLkmBiGIYaIQoon45o8Pa-gO-54mA-AABK4EBZ5jvoOiTmaFrGDGUp5E+9TPhCOGqh23r3Pw6B9ugPh+D4dEhjotLUg2zJMvIrLsvUBGCcJoniTuf6SSWCCKJKto1IisraIsqanPUa78dmakiWJYA+LQABmfR9jpBp6QZxQvvEyRVAcGYPoYSiqR0Ql2ZpTm4AAbkOYGksWHn6bS9RJPKTLYR6ZhrKFHhRfgonueKXmILB+gVFUD6cvpBhcliQA */
    initial: "simple",
    entry: ["rootAction1"],
    exit: ["rootAction1"],
    on: {
      "ROOT.EVENT": {},
    },
    states: {
      simple: {
        entry: ["action1", "really long action", "action3"],
        exit: ["anotherAction", "action4"],
        on: {
          NEXT: "compound",
        },
      },
      compound: {
        invoke: {
          src: "fooSrc",
        },
        initial: "one",
        states: {
          one: {
            on: {
              NEXT: "two",
            },
          },
          two: {
            on: {
              PREV: "one",
            },
          },
          three: {
            initial: "atomic",
            states: {
              atomic: {},
              history: {
                type: "history",
              },
              deepHist: {
                type: "history",
                history: "deep",
              },
            },
          },
        },
      },
      parallel: {
        type: "parallel",
        states: {
          three: {},
          four: {},
          five: {},
        },
      },
      final: {
        type: "final",
      },
    },
  })