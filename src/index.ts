import type { Vector3 } from "three";
import type { PhysicsPlayer } from "./move.js";

export { PhysicsPlayer, type PhysicsWorld } from "./move.js";
export * from "./consts.js";
export * from "./raytrace.js";
export * from "./blockstate.js";
export * from "./materials/index.js";
export * from "./attributes.js";
export { default as BlockPos, blockPosIterator } from "./BlockPos.js";
export { default as Block, calculateIntercept } from "./block.js";

export { default as Blocks } from "./blocks.js";

export interface Input {
	yaw: number;
	// pitch: number,
	sprint: boolean;
	sneak: boolean;
	jump: boolean;
	up: boolean;
	down: boolean;
	left: boolean;
	right: boolean;
	usingItem: boolean;
}

/**
 * @param player the player
 * @param param1 the input to simulate from
 * @returns where the player should go next.
 * @returns the next position.
 */
export function simulate(
	player: PhysicsPlayer,
	{ yaw, sprint, sneak, jump, up, down, left, right, usingItem }: Input,
): Vector3 {
	player.yaw = yaw;

	player.setSprinting(sprint);
	player.sneak = sneak;
	player.jumping = jump;
	player.usingItem = usingItem;

	player.moveForward = (up ? -1 : 0) + (down ? 1 : 0);

	player.moveStrafe = (right ? 1 : 0) + (left ? -1 : 0);

	if (player.sneak) {
		player.moveForward *= 0.3;
		player.moveStrafe *= 0.3;
	}
	if (usingItem && player.ridingEntity === null) {
		/* input.usingItem && !this.isRiding() && (this.moveStrafe *= .2,
        this.moveForward *= .2) */
		player.moveStrafe *= 0.2;
		player.moveForward *= 0.2;
	}

	player.tick();

	return player.pos.clone();
}
