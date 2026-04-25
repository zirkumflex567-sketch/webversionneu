# HTOWN Deploy Standard

Fuer dieses Repo ist aktuell kein automatischer h-town Deploy eingerichtet.

Regel ab jetzt:
- keine systemd Auto-Update-Units fuer `combat`
- kein automatischer Pull vom Repo auf h-town
- kein automatischer GitHub-Deploy-Workflow aus diesem Repo
- Updates und Deploys auf h-town passieren nur manuell

Der Live-Pfad `/combat` und der Runtime-Service `htown-combat-web.service` bleiben davon unberuehrt.
