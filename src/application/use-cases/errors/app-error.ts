// src/application/errors/app-error.ts
export class AppError extends Error {
	constructor(
		public readonly message: string,
		public readonly statusCode: number = 500,
	) {
		super(message);
		this.name = this.constructor.name;
	}
}
