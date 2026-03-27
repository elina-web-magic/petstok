import type { NormalizedDateTime } from '../types/normalized-transport'
import { MINUTES_IN_HOUR, MS_IN_DAY, MS_IN_MINUTE, MS_IN_SECOND } from '../constants'

type NormalizeDateTimeInput = {
	raw: string
	timezone?: string
	baseDateIso?: string
}

const getDayIndex = (d: Date, tz: string) => {
	const parts = new Intl.DateTimeFormat('en-GB', {
		timeZone: tz,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
		.formatToParts(d)
		.reduce(
			(acc, part) => {
				acc[part.type] = part.value
				return acc
			},
			{} as Record<string, string>
		)
	return Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day))
}

const getOffsetInfo = (timezone: string, date: Date) => {
	const parts = new Intl.DateTimeFormat('en-GB', {
		timeZone: timezone,
		timeZoneName: 'shortOffset',
	}).formatToParts(date)
	const offsetStrRaw = parts.find((p) => p.type === 'timeZoneName')?.value || 'GMT+0'
	const match = offsetStrRaw.match(/[+-](\d{1,2})(?::?(\d{2}))?/)
	if (!match) return { ms: 0, formatted: '+00:00' }

	const [, hours, minutes] = match
	const sign = offsetStrRaw.includes('-') ? -1 : 1

	const hNum = parseInt(hours, 10)
	const mNum = parseInt(minutes || '0', 10)

	const ms = sign * (hNum * MINUTES_IN_HOUR + mNum) * MS_IN_MINUTE
	const formatted = `${sign > 0 ? '+' : '-'}${hours.padStart(2, '0')}:${(minutes || '00').padStart(2, '0')}`

	return { ms, formatted }
}

const toOffsetISO = (date: Date, timezone: string, offsetStr: string) => {
	const p = new Intl.DateTimeFormat('en-GB', {
		timeZone: timezone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	})
		.formatToParts(date)
		.reduce(
			(acc, part) => {
				acc[part.type] = part.value
				return acc
			},
			{} as Record<string, string>
		)
	return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${offsetStr}`
}

export const normalizeDateTime = ({
	raw,
	timezone = 'UTC',
	baseDateIso,
}: NormalizeDateTimeInput): NormalizedDateTime => {
	let date: Date
	if (/^\d+$/.test(raw)) {
		const num = Number(raw)
		date = new Date(num > 10_000_000_000 ? num : num * MS_IN_SECOND)
	} else if (raw.endsWith('Z') || /[+-]\d{2}(:?\d{2})?$/.test(raw)) {
		date = new Date(raw)
	} else {
		const naiveDate = new Date(`${raw}Z`)
		const { ms } = getOffsetInfo(timezone, naiveDate)
		date = new Date(naiveDate.getTime() - ms)
	}
	const { formatted: offsetStr } = getOffsetInfo(timezone, date)
	const iso = toOffsetISO(date, timezone, offsetStr)
	const localDisplay = new Intl.DateTimeFormat('en-GB', {
		timeZone: timezone,
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).format(date)
	let dayOffset = 0
	if (baseDateIso) {
		const currentDayIndex = getDayIndex(date, timezone)
		const baseDayIndex = getDayIndex(new Date(baseDateIso), timezone)

		dayOffset = Math.round((currentDayIndex - baseDayIndex) / MS_IN_DAY)
	}
	return {
		iso,
		timezone,
		localDisplay,
		dayOffset,
	}
}
