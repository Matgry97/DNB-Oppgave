import { useState } from 'react';

const useInput = (inputValidator) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const inputIsValid = inputValidator(enteredValue);
	const hasError = !inputIsValid && isTouched;

	const valueChangeHandler = (e) => {
		setEnteredValue(e.target.value);
	};

	const valueBlurChangeHandler = () => {
		setIsTouched(true);
	};

	const resetInput = () => {
		setIsTouched(false);
		setEnteredValue('');
	};

	return {
		value: enteredValue,
		isValid: inputIsValid,
		hasError,
		valueChangeHandler,
		valueBlurChangeHandler,
		resetInput,
	};
};

export default useInput;
