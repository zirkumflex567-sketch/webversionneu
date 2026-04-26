import { describe, expect, it } from "vitest"
import { AREA_DEFINITIONS, getAvailableAreaModes } from "../AreaData"

describe("Area progression modes", () => {
  it("returns no modes for locked areas", () => {
    expect(getAvailableAreaModes("locked", ["story", "free_run"])).toEqual([])
  })

  it("returns campaign modes for active quest state", () => {
    expect(getAvailableAreaModes("active_quest", ["story", "free_run"])).toEqual(["story", "side", "companion"])
  })

  it("returns configured cleared modes", () => {
    expect(getAvailableAreaModes("cleared_free_run", ["story", "bounty", "free_run"])).toEqual(["story", "bounty", "free_run"])
  })

  it("contains a vertical-slice area instance", () => {
    expect(AREA_DEFINITIONS.some((a) => a.id === "graumarsch-chemiefabrik")).toBe(true)
  })
})
