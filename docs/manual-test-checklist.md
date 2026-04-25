# H-Town Combat Web - Manuelle Test-Checkliste

Stand: 2026-04-21

## A) Smoke / Start
1. Seite laden -> Hub ("THE GARAGE") sichtbar, keine JS-Errors in Console.
2. Tabs PILOT / GARAGE / CONTRACTS / TECHLAB wechseln ohne Fehler.
3. DEPLOY TO WASTELAND startet Match.
4. HUD erscheint: HULL-Leiste, SCRAP/TECH-Counter, SYSTEM_WAVE_1, HOSTILES-Counter, NITRO DASH, CHROM-ALCHEMIE-Trigger.

## B) Core Controls (Match)
1. WASD bewegt das Vehicle.
2. Shift loest Nitro Dash aus, Charges sichtbar verbraucht, Cooldown zaehlt.
3. Space feuert Waffe / triggert Ability (Chrom-Alchemie / Magnetic Pulse / Sentry je nach Pilot).
4. Autofire: Waffe schiesst auch ohne Eingabe auf nearest Enemy.

## C) Wave- / Boss-Flow
1. Wave 1 spawnt Standard-Enemies (grün).
2. Wave 3 triggert "BOSS INCOMING!" - roter Flash, roter Titeltext, Horn-Sting-Audio.
3. HeavyEnemies spawnen ab Wave 3 vermehrt, Death-FX = orange Explosion.
4. Wave 4 deployt Extraction Zone an zufaelliger Position (nicht Arena-Mitte).
5. Extraction-Guardian-Callout + Sting erscheint bei Deploy.

## D) Run-Ende / Hub-Return
1. HULL = 0 -> "VEHICLE_CRITICAL_FAILURE" RunSummary, Pilot/Wave/Kills/Scrap/Tech angezeigt.
2. "RETRY DEPLOYMENT" kehrt zum Hub zurueck, banked Scrap = 50% gerettet, Tech = 0.
3. 30s in Extraction Zone -> "EXTRACTED", Scrap + wave*30 Bonus, Tech voll.
4. Nach Extract Scrap/Tech-Counter im Hub-Header aktualisiert.

## E) Hub / Upgrades
1. GARAGE-Tab: Waffen/Chassis kaufen mit Scrap moeglich (falls genug).
2. TECHLAB-Tab: Pilot-Skill-Branches erkennbar, Rank-Up mit Tech funktioniert.
3. CONTRACTS-Tab: Bounty-Auswahl aktivier-/deaktivierbar.
4. PILOT-Tab: Rixa <-> Marek Switch wechselt Ability & Loadout.
5. Nach Purchase: Meta-State persistent ueber Reload (localStorage SaveManager).

## F) HUD / Lesbarkeit
1. HULL-Leiste + SCRAP/TECH jederzeit sichtbar, kein Overlap mit 3D-Szene.
2. Callouts (BOSS INCOMING / WAVE N / EXTRACTED) zentriert, nicht abgeschnitten.
3. Settings-Cog (oben rechts) oeffnet Settings-Overlay.

## G) Responsive / Viewports
Pruefen in: 1920x1080, 1366x768, 390x844 (Mobile).
- Hub-Layout passt, keine Overflows.
- HUD bleibt lesbar, Action-Bar (Nitro/Weapon) am unteren Rand sichtbar.
- RunSummary-Card passt auf mobile Breite.

## H) Release-Gate
1. `npm run lint` -> gruen
2. `npm run test` -> gruen (aktuell 25 Tests)
3. `npx tsc --noEmit` -> gruen
4. `npm run build` -> gruen
5. `npm run start` + HTTP 200 Check auf `/`.
