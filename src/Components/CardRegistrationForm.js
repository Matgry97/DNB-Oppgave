import React from 'react';
import useInput from '../Hooks/use-input';
import Button from '../UI/Button';
import Title from '../UI/Title';

import styles from './CardRegistrationForm.module.css';

//Styles constants

const formControlInvalidStyles = `${styles['form-control']} ${styles['invalid']}`;
const formControlStyles = styles['form-control'];
const errorText = styles['error-text'];

//Validation checks

const textInputValidator = (text) => {
	return text.trim() !== '' && text.trim().length < 50;
};

const cardNumberValidator = (number) => {
	return number.trim().length === 16;
};

const CCVValidator = (number) => {
	return number.trim().length === 3;
};

const DateValidator = (date) => {
	const today = new Date().getTime();
	const dateToTimeString = new Date(date).getTime();

	return today < dateToTimeString;
};

const CardRegistrationFrom = (props) => {
	const { value: enteredName, isValid: nameIsValid, hasError: nameHasError, valueChangeHandler: nameChangeHandler, valueBlurChangeHandler: nameBlurHandler, resetInput: resetNameInput } = useInput(textInputValidator);
	const { value: enteredCardNumber, isValid: cardIsValid, hasError: cardHasError, valueChangeHandler: CardNumberChangeHandler, valueBlurChangeHandler: CardNumberBlurHandler, resetInput: resetCardNumberInput } = useInput(cardNumberValidator);
	const { value: enteredCCV, isValid: CCVIsValid, hasError: CCVHasError, valueChangeHandler: CCVChangeHandler, valueBlurChangeHandler: CCVBlurHandler, resetInput: resetCCVInput } = useInput(CCVValidator);
	const { value: enteredDate, isValid: DateIsValid, hasError: DateHasError, valueChangeHandler: DateChangeHandler, valueBlurChangeHandler: DateBlurHandler, resetInput: resetDateInput } = useInput(DateValidator);

	let formIsValid = false;

	if (nameIsValid && cardIsValid && CCVIsValid) {
		formIsValid = true;
	}

	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (!nameIsValid || !cardIsValid || !CCVIsValid || !DateIsValid) return;

		resetNameInput();
		resetCardNumberInput();
		resetCCVInput();
		resetDateInput();

		const JSONData = {
			cardHolderName: enteredName,
			CardNumber: Number(enteredCardNumber),
			CCV: Number(enteredCCV),
			Date: enteredDate,
		};

		console.log(JSONData);
	};

	const nameInputClasses = nameHasError ? formControlInvalidStyles : formControlStyles;
	const cardNumberClasses = cardHasError ? formControlInvalidStyles : formControlStyles;
	const CCVClasses = CCVHasError ? formControlStyles : formControlStyles;
	const DateClasses = DateHasError ? formControlInvalidStyles : formControlStyles;

	return (
		<form onSubmit={formSubmitHandler}>
			<Title>Card Registration</Title>
			<div className={nameInputClasses}>
				<label htmlFor="name">Cardholder Name</label>
				<input type="text" id="name" onChange={nameChangeHandler} onBlur={nameBlurHandler} value={enteredName} />
				{nameHasError && <p className={errorText}>Name must not be empty</p>}
			</div>
			<div className={styles['wrapper-div']}>
				<div className={cardNumberClasses}>
					<label htmlFor="cardnumber">Card Number</label>
					<input type="number" id="cardnumber" onChange={CardNumberChangeHandler} onBlur={CardNumberBlurHandler} value={enteredCardNumber} />
					{cardHasError && <p className={errorText}>Card Number must be 16 charachters</p>}
				</div>
				<div className={CCVClasses}>
					<label htmlFor="ccv">CCV</label>
					<input type="number" id="ccv" onChange={CCVChangeHandler} onBlur={CCVBlurHandler} value={enteredCCV} />
					{CCVHasError && <p className={errorText}>CCV must be only 3 numbers</p>}
				</div>
			</div>
			<div className={DateClasses}>
				<label htmlFor="date">Date</label>
				<input type="date" id="date" onChange={DateChangeHandler} onBlur={DateBlurHandler} value={enteredDate} />
				{DateHasError && <p className={errorText}>Card must not be expired</p>}
			</div>
			<div className={styles['form-actions']}>
				<Button disabled={!formIsValid}>Register Card</Button>
			</div>
		</form>
	);
};

export default CardRegistrationFrom;
