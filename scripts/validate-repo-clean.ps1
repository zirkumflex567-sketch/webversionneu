$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$blockedDirNames = @("node_modules",".next","tmp","artifacts",".chatgpt",".claude",".data",".obsidian","tools")
$blockedFilePatterns = @("*.zip","*.log","*.tmp","tsconfig.tsbuildinfo")
$blockedPathPatterns = @("*\screenshots\*","*\screen\*","*\debug-exports\*","*\tmp\*")
$badDirs = Get-ChildItem -Path $root -Directory -Recurse -Force | Where-Object { $blockedDirNames -contains $_.Name }
$badFiles = foreach($p in $blockedFilePatterns){ Get-ChildItem -Path $root -File -Recurse -Force -Filter $p -ErrorAction SilentlyContinue }
$pathBad = Get-ChildItem -Path $root -File -Recurse -Force -ErrorAction SilentlyContinue | Where-Object {
  $full = $_.FullName.ToLowerInvariant()
  $blockedPathPatterns | ForEach-Object { if($full -like $_.ToLowerInvariant()){ return $true } }
}
if($badDirs -or $badFiles -or $pathBad){
  Write-Host "Blocked content found:" -ForegroundColor Red
  $badDirs | ForEach-Object { Write-Host "DIR  $($_.FullName)" }
  $badFiles | ForEach-Object { Write-Host "FILE $($_.FullName)" }
  $pathBad | ForEach-Object { Write-Host "PATH $($_.FullName)" }
  exit 1
}
Write-Host "Repo clean-boundary check passed." -ForegroundColor Green
