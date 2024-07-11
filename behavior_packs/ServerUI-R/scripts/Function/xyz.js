import { math } from "./math"
export class Xyz {
	constructor(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
	}

	floor(str) {
		const reg = /[xyz]/g
		const string = str.match(reg)
		if (reg.test(str)) {
			return new Xyz(
				!string.includes("x") ? this.x : Math.floor(this.x),
				!string.includes("y") ? this.y : Math.floor(this.y),
				!string.includes("z") ? this.z : Math.floor(this.z)
			)
		}
	}

	round(str) {
		const reg = /[xyz]/g
		const string = str.match(reg)
		if (reg.test(str)) {
			return new Xyz(
				!string.includes("x") ? this.x : Math.round(this.x),
				!string.includes("y") ? this.y : Math.round(this.y),
				!string.includes("z") ? this.z : Math.round(this.z)
			)
		}
	}

	abs(str) {
		const reg = /[xyz]/g
		const string = str.match(reg)
		if (reg.test(str)) {
			return new Xyz(
				!string.includes("x") ? this.x : Math.abs(this.x),
				!string.includes("y") ? this.y : Math.abs(this.y),
				!string.includes("z") ? this.z : Math.abs(this.z)
			)
		}
	}

	randomize(str, v1, v2) {
		const reg = /[xyz]/g
		const string = str.match(reg)
		if (reg.test(str)) {
			return new Xyz(
				!string.includes("x") ? this.x : math.random(v1, v2)+this.x,
				!string.includes("y") ? this.y : math.random(v1, v2)+this.y,
				!string.includes("z") ? this.z : math.random(v1, v2)+this.z
			)
		}
	}

	 //findHighestY() {
	   //let y
	     // for (let i = 320; i > -64; i--) {
			 //const block = mc.world.getDimension("overworld").getBlock(new Xyz(this.x, i, this.z))
			 //if (block.isAir() == false) {
				 //y = i
				 //break
			//}
		// }
		 //return new Xyz(this.x, y+1, this.z)
	 //}

	map(callback) {
		return callback({
			x: this.x,
			y: this.y,
			z: this.z
		})
	}

	toArray() {
		return [this.x, this.y, this.z]
	}

	static getFromEntityLocation(entity) {
		return new this(entity.location.x, entity.location.y, entity.location.z)
	}

	static getFromBlockLocation(block) {
		return new this(block.x, block.y, block.z)
	}

}