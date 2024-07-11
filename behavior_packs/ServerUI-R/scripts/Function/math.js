// export
export class math {
	constructor() {}

	static pi = Math.PI
	static π = Math.PI

	static sin(v) {
		return Math.sin(this.π*2/(360/v))
	}

	static cos(v) {
		return Math.cos(this.π*2/(360/v))
	}

	static random(min, max) {
		return Math.random() * (max - min) + min
	}

	static randomInt(min, max) {
		return Math.round(Math.random() * (max - min) + min)
	}

	static clamp(number, min, max) {
	  return Math.max(min, Math.min(number, max))
	}

}