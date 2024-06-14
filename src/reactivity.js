let runningEffect;
export const effect = (func) => {
	runningEffect = func;
	func();
	runningEffect = null;
};

export const signal = (initial) => {
	const effects = [];
	let state = initial;
	return [
		() => {
			if (runningEffect) {
				effects.push(runningEffect);
			}
			return state;
		},
		(newValue) => {
			state = newValue;
			effects.forEach((e) => {
				e();
			});
		},
	];
};
