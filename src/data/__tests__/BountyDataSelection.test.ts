import { describe, expect, it } from "vitest"
import { BOUNTIES, canUnlockBounty, enforceSingleBountySelection, aggregateBountyEffects } from "../BountyData"

describe("Bounty selection and unlock rules", () => {
  it("enforces a single active bounty", () => {
    expect(enforceSingleBountySelection(["a", "b", "c"]).length).toBe(1)
    expect(enforceSingleBountySelection(["a", "b", "c"])[0]).toBe("c")
  })

  it("checks unlock conditions against completed flags", () => {
    const techHeist = BOUNTIES.find((b) => b.id === "bounty_tech_heist")!
    expect(canUnlockBounty(techHeist, [])).toBe(false)
    expect(canUnlockBounty(techHeist, ["mq05_complete"]) ).toBe(true)
  })

  it("applies effects from only one selected bounty", () => {
    const multi = aggregateBountyEffects(["bounty_scrap_rush", "bounty_tech_heist"])
    const single = aggregateBountyEffects(["bounty_tech_heist"])
    expect(multi.techMult).toBe(single.techMult)
    expect(multi.incomingDamageMult).toBe(single.incomingDamageMult)
  })
})
