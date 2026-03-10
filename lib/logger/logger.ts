/** biome-ignore-all lint/suspicious/noConsole: Log errors */
import type { LogSink } from './sinks'

import type { LogContext, LogEvent, LogLevel, SerializedError } from './types'

type LoggerOptions = {
	scope: string
	minLevel: LogLevel
	defaultContext?: LogContext
	sinks: LogSink[]
}

export class Logger {
	private readonly scope: string
	private readonly minLevel: LogLevel
	private readonly defaultContext?: LogContext
	private readonly sinks: LogSink[]

	private static readonly levelPriority: Record<LogLevel, number> = {
		debug: 10,
		info: 20,
		warn: 30,
		error: 40,
	}

	public constructor(options: LoggerOptions) {
		this.scope = options.scope
		this.minLevel = options.minLevel
		this.defaultContext = options.defaultContext
		this.sinks = options.sinks
	}

	public isEnabled = (level: LogLevel): boolean => {
		const current = Logger.levelPriority[level]
		const minimum = Logger.levelPriority[this.minLevel]
		return current >= minimum
	}

	private serializeError = (error: unknown): SerializedError | undefined => {
		if (!error) return undefined

		if (error instanceof Error) {
			return {
				name: error.name,
				message: error.message,
				stack: error.stack,
			}
		}

		if (typeof error === 'string') {
			return {
				name: 'Error',
				message: error,
			}
		}

		try {
			return {
				name: 'Error',
				message: JSON.stringify(error),
			}
		} catch {
			return {
				name: 'Error',
				message: 'Unknown error',
			}
		}
	}

	private mergeContext = (callContext?: LogContext): LogContext | undefined => {
		if (!this.defaultContext && !callContext) return undefined
		return {
			...(this.defaultContext ?? {}),
			...(callContext ?? {}),
		}
	}

	private buildEvent = (
		level: LogLevel,
		message: string,
		context?: LogContext,
		error?: unknown
	): LogEvent => {
		const mergedContext = this.mergeContext(context)
		const serializedError = this.serializeError(error)

		return {
			timestamp: new Date().toISOString(),
			level,
			scope: this.scope,
			message,
			context: mergedContext,
			error: serializedError,
		}
	}

	private writeToSinks = (event: LogEvent): void => {
		for (const sink of this.sinks) {
			try {
				sink.write(event)
			} catch (sinkError) {
				const safeError = this.serializeError(sinkError)
				console.error('[Logger] Sink write failed', { sinkError: safeError, event })
			}
		}
	}

	public log = (level: LogLevel, message: string, context?: LogContext, error?: unknown): void => {
		if (!this.isEnabled(level)) return
		const event = this.buildEvent(level, message, context, error)
		this.writeToSinks(event)
	}

	public debug = (message: string, context?: LogContext): void => {
		this.log('debug', message, context)
	}

	public info = (message: string, context?: LogContext): void => {
		this.log('info', message, context)
	}

	public warn = (message: string, context?: LogContext): void => {
		this.log('warn', message, context)
	}

	public error = (message: string, context?: LogContext, error?: unknown): void => {
		this.log('error', message, context, error)
	}

	public child = (extraContext: LogContext): Logger => {
		return new Logger({
			scope: this.scope,
			minLevel: this.minLevel,
			sinks: this.sinks,
			defaultContext: {
				...(this.defaultContext ?? {}),
				...extraContext,
			},
		})
	}

	public withScope = (scopeSuffix: string): Logger => {
		const nextScope = scopeSuffix ? `${this.scope}:${scopeSuffix}` : this.scope

		return new Logger({
			scope: nextScope,
			minLevel: this.minLevel,
			sinks: this.sinks,
			defaultContext: this.defaultContext,
		})
	}
}
