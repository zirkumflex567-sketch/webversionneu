import { spawn } from 'node:child_process'

async function waitForUrl(url, timeoutMs = 120000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok || res.status === 404) return
    } catch {
      // server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  throw new Error(`Timed out waiting for server: ${url}`)
}

export async function withLocalServer(baseUrl, fn) {
  const env = { ...process.env, PORT: '3000' }
  const npmExecPath = process.env.npm_execpath
  const child = npmExecPath
    ? spawn(process.execPath, [npmExecPath, 'run', 'dev', '--', '--port', '3000'], {
        stdio: 'ignore',
        shell: false,
        env,
      })
    : spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev', '--', '--port', '3000'], {
        stdio: 'ignore',
        shell: false,
        env,
      })

  try {
    await waitForUrl(baseUrl)
    return await fn()
  } finally {
    child.kill()
  }
}
