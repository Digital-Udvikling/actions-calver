import {ITags} from './types'
import {format} from 'date-fns'

export function buildDatePart(date: Date): string {
  return format(date, 'yyyy.MM.dd')
}

export function nextAvailableMicro(
  datePart: string,
  existingTags: ITags,
  prefix?: string
): number {
  const datePattern = /^\d{4}\.\d{2}\.\d{2}-\d+$/
  const prefixedDatePattern = new RegExp(
    `^${
      prefix ? prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : ''
    }\\d{4}\\.\\d{2}\\.\\d{2}-\\d+$`
  )

  const pattern = prefix ? prefixedDatePattern : datePattern
  const searchPrefix = prefix ? `${prefix}${datePart}` : datePart

  const maxExistingMicro = Math.max(
    0,
    ...existingTags
      .filter(tag => pattern.test(tag.name))
      .filter(tag => tag.name.startsWith(searchPrefix))
      .map(tag => {
        try {
          // Remove prefix if present before parsing
          const cleanTag = prefix ? tag.name.replace(prefix, '') : tag.name
          return parseInt(cleanTag.split('-')[1], 10)
        } catch (e) {
          return -1
        }
      })
  )
  return maxExistingMicro + 1
}

export function buildTag(date: Date, micro: number): string {
  return `${buildDatePart(date)}-${micro.toString().padStart(2, '0')}`
}
