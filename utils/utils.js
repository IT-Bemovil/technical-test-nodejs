import crypto from 'crypto'

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  return `${salt}:${hash}`
}

export function checkPassword(hashedPassword, password) {
  const [salt, originalHash] = hashedPassword.split(':')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  return hash === originalHash
}

export function formatDateToLocal(dateStr, locale = 'es-CO') {
  const incomingDate = new Date(dateStr)

  const dateOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  const dateFormatter = new Intl.DateTimeFormat(locale, dateOptions)
  const timeFormatter = new Intl.DateTimeFormat(locale, timeOptions)
  const date = dateFormatter.format(incomingDate)
  const time = timeFormatter.format(incomingDate)

  return { date, time, dateTime: `${date}, ${time}` }
}
