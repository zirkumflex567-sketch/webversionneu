interface BuildInfoOptions {
  version: string
  sha?: string
  builtAtUtc?: string
}

export function formatBuildTimestampMesz(utcIso?: string): string | null {
  if (!utcIso) {
    return null
  }

  const parsed = new Date(utcIso)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return (
    parsed.toLocaleString('de-DE', {
      timeZone: 'Europe/Berlin',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }) + ' MESZ'
  )
}

export function getBuildInfo({ version, sha, builtAtUtc }: BuildInfoOptions) {
  return {
    version,
    shaShort: sha ? sha.slice(0, 7) : null,
    builtAtMesz: formatBuildTimestampMesz(builtAtUtc),
  }
}
