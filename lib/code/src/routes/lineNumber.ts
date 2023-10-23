//@ts-nocheck
import type { Window } from "happy-dom"
type PrismType = typeof import("prismjs")

export function lineNo(Prism: PrismType, window: Window) {
  if (typeof Prism === "undefined") return
  const PLUGIN_NAME = "lineNo"
  const NEW_LINE_EXP = /\n(?!$)/g
  const config = (Prism.plugins.lineNumbers = {
    /**
     * Get node for provided line number
     *
     * @param {Element} element pre element
     * @param {number} number line number
     * @returns {Element|undefined}
     */
    getLine: function (element: Element, number: number): Element | undefined {
      if (element.tagName !== "PRE" || !element.classList.contains(PLUGIN_NAME)) return

      const lineNumberRows = element.querySelector(".line-numbers-rows")
      if (!lineNumberRows) return
      //@ts-ignore
      const lineNumberStart = parseInt(element.getAttribute("data-start"), 10) || 1
      const lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1)

      if (number < lineNumberStart) number = lineNumberStart
      if (number > lineNumberEnd) number = lineNumberEnd

      const lineIndex = number - lineNumberStart
      return lineNumberRows.children[lineIndex]
    },
    /**
     * Resizes the line numbers of the given element.
     *
     * This function will not add line numbers. It will only resize existing ones.
     *
     * @param {HTMLElement} element A `<pre>` element with line numbers.
     * @returns {void}
     */
    resize: function (element: HTMLElement): void {
      resizeElements([element])
    },
    /**
     * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
     * the current viewport.
     *
     * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
     *
     * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
     *
     * @type {boolean}
     */
    assumeViewportIndependence: true,
  })
  /**
   * Resizes the given elements.
   *
   * @param {HTMLElement[]} elements
   */
  function resizeElements(elements: HTMLElement[]) {
    elements = elements.filter(function (e) {
      var codeStyles = getStyles(e)
      var whiteSpace = codeStyles["white-space"]
      return whiteSpace === "pre-wrap" || whiteSpace === "pre-line"
    })
    if (elements.length == 0) return
    const infos = elements
      .map(function (element) {
        var codeElement = element.querySelector("code")
        var lineNumbersWrapper = element.querySelector(".line-numbers-rows")
        if (!codeElement || !lineNumbersWrapper) {
          return undefined
        }
        /** @type {HTMLElement} */
        let lineNumberSizer: HTMLElement | null = element.querySelector(".line-numbers-sizer")
        const codeLines = codeElement?.textContent?.split(NEW_LINE_EXP)
        if (!lineNumberSizer) {
          lineNumberSizer = window.document.createElement("span")
          lineNumberSizer.className = "line-numbers-sizer"
          codeElement.appendChild(lineNumberSizer)
        }
        lineNumberSizer.innerHTML = "0"
        lineNumberSizer.style.display = "block"
        const oneLinerHeight = lineNumberSizer.getBoundingClientRect().height
        lineNumberSizer.innerHTML = ""
        return {
          element: element,
          lines: codeLines,
          lineHeights: [],
          oneLinerHeight,
          sizer: lineNumberSizer,
        }
      })
      .filter(Boolean)
    infos.forEach(function (info) {
      if (info) {
        const lineNumberSizer = info.sizer
        const lines = info.lines
        const lineHeights = info.lineHeights
        const oneLinerHeight = info.oneLinerHeight
        //@ts-ignore
        lineHeights[lines.length - 1] = undefined
        lines?.forEach(function (line, index) {
          if (line && line.length > 1) {
            var e = lineNumberSizer.appendChild(window.document.createElement("span"))
            e.style.display = "block"
            e.textContent = line
          } else {
            //@ts-ignore
            lineHeights[index] = oneLinerHeight
          }
        })
      }
    })
    infos.forEach(function (info) {
      if (info) {
        const lineNumberSizer = info.sizer
        const lineHeights = info.lineHeights

        var childIndex = 0
        for (var i = 0; i < lineHeights.length; i++) {
          if (lineHeights[i] === undefined) {
            //@ts-ignore
            lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height
          }
        }
      }
    })
    infos.forEach(function (info) {
      if (info && info.sizer) {
        const lineNumberSizer = info.sizer
        const wrapper = info.element.querySelector(".line-numbers-rows")

        lineNumberSizer.style.display = "none"
        lineNumberSizer.innerHTML = ""

        info.lineHeights.forEach(function (height, lineNumber) {
          //@ts-ignore
          wrapper.children[lineNumber].style.height = height + "px"
        })
      }
    })
  }

  /**
   * Returns style declarations for the element
   *
   * @param {Element} element
   */
  function getStyles(element: Element) {
    if (!element) return null
    return null
  }

  let lastWidth: number | undefined = undefined
  window.addEventListener("resize", function () {
    if (config.assumeViewportIndependence && lastWidth === window.innerWidth) return
    lastWidth = window.innerWidth
    resizeElements(Array.prototype.slice.call(window.document.querySelectorAll("pre." + PLUGIN_NAME)))
  })

  Prism.hooks.add("complete", function (env) {
    if (!env.code) return
    const code = /** @type {Element} */ env.element
    const pre = /** @type {HTMLElement} */ code.parentNode
    // works only for <code> wrapped inside <pre> (not inline)
    if (!pre || !/pre/i.test(pre.nodeName)) return
    // Abort if line numbers already exists
    if (code.querySelector(".line-numbers-rows")) return
    //@ts-ignore only add line numbers if <code> or one of its ancestors has the `line-numbers` class
    if (!Prism.util.isActive(code, PLUGIN_NAME)) return
    // Remove the class 'line-numbers' from the <code>
    code.classList.remove(PLUGIN_NAME)
    //@ts-ignore Add the class 'line-numbers' to the <pre>
    pre.classList.add(PLUGIN_NAME)

    const match = env.code.match(NEW_LINE_EXP)
    const linesNum = match ? match.length + 1 : 1
    let lineNumbersWrapper

    var lines = new Array(linesNum + 1).join("<span></span>")
    lineNumbersWrapper = window.document.createElement("span")
    lineNumbersWrapper.setAttribute("aria-hidden", "true")
    lineNumbersWrapper.className = "line-numbers-rows"
    lineNumbersWrapper.innerHTML = lines
    //@ts-ignore
    if (pre.hasAttribute("data-start")) {
      //@ts-ignore
      pre.style.counterReset = "linenumber " + (parseInt(pre.getAttribute("data-start"), 10) - 1)
    }
    env.element.appendChild(lineNumbersWrapper)
    //@ts-ignore
    resizeElements([pre])
    Prism.hooks.run(PLUGIN_NAME, env)
  })

  Prism.hooks.add(PLUGIN_NAME, function (env) {
    console.log(env.plugins)
    env.plugins = env.plugins || {}
    env.plugins.lineNumbers = true
  })
}
