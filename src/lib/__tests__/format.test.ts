import { describe, it, expect } from 'vitest'
import { formatMinutes, formatNumber, formatDateShort, monthLabel, hourLabel, pct } from '../format'

describe('formatMinutes', () => {
  it('formats under an hour', () => { expect(formatMinutes(45)).toBe('45 min') })
  it('formats hours', () => { expect(formatMinutes(120)).toBe('2 hr') })
  it('formats hours and minutes', () => { expect(formatMinutes(90)).toBe('1 hr 30 min') })
})
describe('formatNumber', () => { it('adds commas', () => { expect(formatNumber(3895)).toBe('3,895') }) })
describe('formatDateShort', () => { it('formats a date', () => { expect(formatDateShort('2026-06-15T10:00:00')).toContain('Jun') }) })
describe('monthLabel', () => { it('labels YYYY-MM', () => { expect(monthLabel('2026-06')).toContain('Jun') }) })
describe('hourLabel', () => {
  it('labels hours', () => {
    expect(hourLabel(0)).toBe('12am'); expect(hourLabel(8)).toBe('8am')
    expect(hourLabel(12)).toBe('12pm'); expect(hourLabel(21)).toBe('9pm')
  })
})
describe('pct', () => { it('formats a share', () => { expect(pct(0.255)).toBe('25.5%') }) })

describe('formatHours', () => {
  it('formats hours with one decimal', () => {
    expect(formatHours(10.877)).toBe('10.9 hrs')
    expect(formatHours(1)).toBe('1 hr')
  })
})