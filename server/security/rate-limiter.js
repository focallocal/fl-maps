
export function logUserId (name, id, type = 'Method') {
  console.log(`----------------- ${type}: "${name}", RateLimiter -> User ID: ${id}`)
}

export function logUserIp (name, ip, type = 'Method') {
  console.log(`----------------- ${type}: "${name}", RateLimiter -> User IP: ${ip}`)
}
