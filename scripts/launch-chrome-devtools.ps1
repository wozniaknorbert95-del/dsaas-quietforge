# Launch Chrome for chrome-devtools MCP (port 9222)
$chrome = "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  Write-Error "Chrome not found at $chrome"
  exit 1
}
Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Start-Process $chrome -ArgumentList "--remote-debugging-port=9222", "https://quietforge.nl/"
Write-Host "Chrome ready on :9222"
