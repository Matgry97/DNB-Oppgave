//Variables

export const maxLengthCCV = 3;
export const maxLengthCreditCardNumber = 16;

export const findNextSmalletsInt = (arr) => {
	// let smallest = arr[0];
	// let nextSmallest = arr[0];

	// for (let i = 0; i < arr.length; i++) {
	// 	if (smallest > arr[i]) {
	// 		nextSmallest = smallest;
	// 		smallest = arr[i];
	// 	} else if (arr[i] !== smallest && arr[i] > smallest) {
	// 		nextSmallest = arr[i];
	// 	}
	// }

	// return [smallest, nextSmallest];

	arr.sort((a, b) => a - b);

	console.log(arr.slice(1, 2));
};
