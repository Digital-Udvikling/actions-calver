import {ITags} from './types'
import {format} from 'date-fns'

export function buildDatePart(date: Date): string {
  return format(date, 'yyyy.MM.dd')
}

export function nextAvailableMicro(
  datePart: string,
  existingTags: ITags
): number {
  const maxExistingMicro = Math.max(
    0,
    ...existingTags
      .filter(tag => /^\d{4}\.\d{2}\.\d{2}-\d+$/.test(tag.name))
      .filter(tag => tag.name.startsWith(datePart))
      .map(tag => {
        try {
          return parseInt(tag.name.split('-')[1], 10)
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
