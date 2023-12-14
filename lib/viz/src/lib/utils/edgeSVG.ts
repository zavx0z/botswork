enum Sides {
  Top = "top",
  Right = "right",
  Bottom = "bottom",
  Left = "left",
}

export interface Point {
  x: number
  y: number
}
export type LineSegment = [Point, Point]
export interface SidePoint extends Point {
  side: Sides
}
export type SideLineSegment = [SidePoint, SidePoint]
export type Path = Point[]
export type MPathParam = ["M", Point]
export type LPathParam = ["L", Point]
export type ZPathParam = ["Z"]
export type CPathParam = ["C", Point, Point, Point]
export type QPathParam = ["Q", Point, Point]
export type PathParam = MPathParam | LPathParam | ZPathParam | CPathParam | QPathParam
export type SvgPath = [MPathParam, ...PathParam[]]

export function simplifyPoints(points: Point[]): Point[] {
  const pointHashes = new Set<string>()
  const result: Point[] = []
  points.forEach((point, i) => {
    const prevPoint = points[i - 1]
    const nextPoint = points[i + 1]
    if (prevPoint?.x === point.x && point.x === nextPoint?.x) return
    if (prevPoint?.y === point.y && point.y === nextPoint?.y) return
    const hash = `${point.x}|${point.y}`
    if (pointHashes.has(hash)) return
    result.push(point)
  })
  return result
}

export function withMidpoints(points: Point[]): Point[] {
  const pointsWithMid: Point[] = []
  points.forEach((pt, i) => {
    const [ptA, ptB, ptC] = [pt, points[i + 1], points[i + 2]]
    if (!ptC || !ptB) {
      pointsWithMid.push(ptA)
      return
    }
    // if (ptA.command === "M" || ptB.command === "M" || ptC.command === "M") {
    //   pointsWithMid.push(ptA)
    //   return
    // }
    const midpt = {
      x: ptA.x + (ptB.x - ptA.x) / 2,
      y: ptA.y + (ptB.y - ptA.y) / 2,
      color: "green",
      label: "midpoint",
    }
    pointsWithMid.push(ptA, midpt)
  })
  return pointsWithMid
}

export function getSvgPath(sourcePoint: Point, targetPoint: Point, side: Sides = Sides.Top): SvgPath {
  const preStartPoint = sourcePoint
  const startPoint = { x: sourcePoint.x + 20, y: sourcePoint.y }
  const endPoint = targetPoint
  const endSide = side
  const svgPath: SvgPath = [["M", sourcePoint]]
  const points: Point[] = [preStartPoint, startPoint]
  const midX = (endPoint.x - startPoint.x) / 2 + startPoint.x
  const midY = (endPoint.y - startPoint.y) / 2 + startPoint.y
  switch (endSide) {
    case "right":
      points.push({ x: startPoint.x, y: endPoint.y })
      if (endPoint.y > startPoint.y) {
      }
      break
    case "left":
      points.push({ x: midX, y: startPoint.y }, { x: midX, y: endPoint.y })
      break
    case "top":
      startPoint.x < endPoint.x ? points.push({ x: endPoint.x, y: startPoint.y }) : points.push({ x: startPoint.x, y: midY }, { x: endPoint.x, y: midY })
      break
    case "bottom":
      startPoint.x > endPoint.x ? points.push({ x: startPoint.x, y: midY }, { x: endPoint.x, y: midY }) : points.push({ x: endPoint.x, y: startPoint.y })
      break
    default:
      break
  }
  points.push(endPoint)
  const pointsWithMid = withMidpoints(simplifyPoints(points))
  pointsWithMid.forEach((pt, i, pts) => {
    if (i >= 2 && i <= pts.length - 2 && isBendable(pts[i - 1], pt, pts[i + 1])) {
      const { p1, p2, p } = roundOneCorner(pts[i - 1], pt, pts[i + 1])
      svgPath.push(["L", p1], ["C", p1, p, p2])
    } else svgPath.push(["L", pt])
  })
  return svgPath
}

export const isBendable = (p1: Point, corner: Point, p2: Point): boolean => !((p1.x === corner.x && p2.x === corner.x) || (p1.y === corner.y && p2.y === corner.y))

interface CubicCurve {
  p1: Point
  p2: Point
  p: Point
}

interface Vector {
  type: "vector"
  x: number
  y: number
}

const lineToVector = (p1: Point, p2: Point): Vector => {
  const vector = {
    type: "vector" as const,
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  }
  return vector
}

const vectorToUnitVector = (v: Vector): Vector => {
  let magnitude = v.x * v.x + v.y * v.y
  magnitude = Math.sqrt(magnitude)
  const unitVector = {
    type: "vector" as const,
    x: v.x / magnitude,
    y: v.y / magnitude,
  }
  return unitVector
}

export const roundOneCorner = (p1: Point, corner: Point, p2: Point, radius: number = 20): CubicCurve => {
  const corner_to_p1 = lineToVector(corner, p1)
  const corner_to_p2 = lineToVector(corner, p2)
  const p1dist = Math.hypot(corner_to_p1.x, corner_to_p1.y)
  const p2dist = Math.hypot(corner_to_p2.x, corner_to_p2.y)
  if (p1dist * p2dist === 0) {
    return {
      p1: corner,
      p2: corner,
      p: corner,
    }
  }
  const resolvedRadius = Math.min(radius, p1dist - 0.1, p2dist - 0.1)
  const corner_to_p1_unit = vectorToUnitVector(corner_to_p1)
  const corner_to_p2_unit = vectorToUnitVector(corner_to_p2)

  const curve_p1 = {
    x: corner.x + corner_to_p1_unit.x * resolvedRadius,
    y: corner.y + corner_to_p1_unit.y * resolvedRadius,
  }
  const curve_p2 = {
    x: corner.x + corner_to_p2_unit.x * resolvedRadius,
    y: corner.y + corner_to_p2_unit.y * resolvedRadius,
  }
  const path = {
    p1: curve_p1,
    p2: curve_p2,
    p: corner,
  }
  return path
}
export const getRect = (rect: DOMRect): DOMRect => ({
  x: rect.x,
  y: rect.y,
  width: rect.width,
  height: rect.height,
  top: rect.y,
  bottom: rect.y + rect.height,
  left: rect.x,
  right: rect.x + rect.width,
  toJSON() {
    return ""
  },
})
export function getPath(sourceRect: DOMRect, labelRect: DOMRect, targetRect: DOMRect, targetPoint?: Point): SvgPath | undefined {
  // const sourcePoint = r.point('right', 'center');
  const edgeEntryPoint = {
    x: labelRect.left,
    y: labelRect.top + labelRect.height / 2,
  }
  const edgeExitPoint = {
    x: labelRect.right,
    y: labelRect.top + labelRect.height / 2,
  }
  // self-transition
  if (labelRect === targetRect) {
    return [
      ["M", edgeExitPoint],
      ["Q", { x: edgeExitPoint.x + 10, y: edgeExitPoint.y - 10 }, { x: edgeExitPoint.x + 20, y: edgeExitPoint.y }],
      ["Q", { x: edgeExitPoint.x + 10, y: edgeExitPoint.y + 10 }, edgeExitPoint],
    ]
  }
  const intersections = closestRectIntersections([edgeExitPoint, { x: targetRect.left + targetRect.width / 2, y: targetRect.top + targetRect.height / 2 }], targetRect)
  if (!intersections) return undefined

  targetPoint = targetPoint ?? intersections[0].point
  const endPoint = targetPoint
  const endSide = intersections[0].side
  switch (endSide) {
    case Sides.Top:
      endPoint.y -= 10
      break
    case Sides.Left:
      endPoint.x -= 10
      break
    case Sides.Bottom:
      endPoint.y += 10
      break
    case Sides.Right:
      endPoint.x += 10
      break
    default:
      break
  }
  const preSvgPath = getSvgPath({ x: sourceRect.right, y: sourceRect.top }, edgeEntryPoint, Sides.Left)
  const svgPath = getSvgPath(edgeExitPoint, endPoint, endSide)
  // @ts-ignore
  return preSvgPath.concat(svgPath)
}

export const pathToD = (path: SvgPath): string => path.map(([cmd, ...points]) => [cmd, ...points.map((point: Point) => `${point.x},${point.y}`)].join(" ")).join(" ")

type RectIntersection = {
  point: Point
  side: Sides
}

function segmentIntersection(ls1: LineSegment, ls2: LineSegment): Point | false {
  const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = ls1
  const [{ x: x3, y: y3 }, { x: x4, y: y4 }] = ls2
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) return false
  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)
  // Lines are parallel
  if (denominator === 0) return false
  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false
  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1)
  let y = y1 + ua * (y2 - y1)
  return { x, y }
}

function rectIntersection(ls: LineSegment, rect: DOMRect): RectIntersection[] {
  const top = {
    point: segmentIntersection(ls, [
      { x: rect.left, y: rect.top },
      { x: rect.right, y: rect.top },
    ]),
    side: Sides.Top,
  }
  const right = {
    point: segmentIntersection(ls, [
      { x: rect.right, y: rect.top },
      { x: rect.right, y: rect.bottom },
    ]),
    side: Sides.Right,
  }
  const bottom = {
    point: segmentIntersection(ls, [
      { x: rect.right, y: rect.bottom },
      { x: rect.left, y: rect.bottom },
    ]),
    side: Sides.Bottom,
  }
  const left = {
    point: segmentIntersection(ls, [
      { x: rect.left, y: rect.bottom },
      { x: rect.left, y: rect.top },
    ]),
    side: Sides.Left,
  }
  return [top, right, bottom, left].filter((ix): ix is RectIntersection => ix.point !== false)
}

export function closestRectIntersections(ls: LineSegment, rect: DOMRect): RectIntersection[] | false {
  const intersections = rectIntersection(ls, rect)
  let minDistance = Infinity
  let rectIntersections: RectIntersection[] = []
  for (let rectIx of intersections) {
    const { side, point: intersection } = rectIx
    // const intersection = intersections[side as Sides];
    const distance = Math.hypot(intersection.x - ls[0].x, intersection.y - ls[0].y)
    const rectIntersection = {
      point: intersection,
      side: side as Sides,
    }
    if (distance < minDistance) {
      rectIntersections = [rectIntersection]
      minDistance = distance
    } else if (distance === minDistance) {
      rectIntersections.push(rectIntersection)
    }
  }
  return rectIntersections.length > 0 ? rectIntersections : false
}