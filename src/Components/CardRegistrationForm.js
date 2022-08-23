import React from 'react';
import useInput from '../Hooks/use-input';
import Button from '../UI/Button';
import Title from '../UI/Title';

import { findNextSmalletsInt, maxLengthCCV, maxLengthCreditCardNumber } from '../Helpers/Helpers';

import styles from './CardRegistrationForm.module.css';

//Styles constants

const formControlInvalidStyles = `${styles['form-control']} ${styles['invalid']}`;
const formControlStyles = styles['form-control'];
const errorText = styles['error-text'];

//Validation checks

const textInputValidator = (text) => {
	const regExp = new RegExp(/\d/);
	return text.trim().length > 5 && !regExp.test(text);
};

const cardNumberValidator = (number) => {
	return number.trim().length === 16 && !isNaN(number);
};

const CCVValidator = (number) => {
	return number.trim().length === 3 && !isNaN(number);
};

const DateValidator = (date) => {
	const today = new Date().getTime();
	const dateToTimeString = new Date(date).getTime();

	return today < dateToTimeString;
};

const CardRegistrationFrom = (props) => {
	// const randomArray = [1, 34, 55, 42, 20];
	// findNextSmalletsInt(randomArray);

	const { value: enteredName, isValid: nameIsValid, hasError: nameHasError, valueChangeHandler: nameChangeHandler, valueBlurChangeHandler: nameBlurHandler, resetInput: resetNameInput } = useInput(textInputValidator);
	const { value: enteredCardNumber, isValid: cardIsValid, hasError: cardHasError, valueChangeHandler: CardNumberChangeHandler, valueBlurChangeHandler: CardNumberBlurHandler, resetInput: resetCardNumberInput } = useInput(cardNumberValidator);
	const { value: enteredCCV, isValid: CCVIsValid, hasError: CCVHasError, valueChangeHandler: CCVChangeHandler, valueBlurChangeHandler: CCVBlurHandler, resetInput: resetCCVInput } = useInput(CCVValidator);
	const { value: enteredDate, isValid: DateIsValid, hasError: DateHasError, valueChangeHandler: DateChangeHandler, valueBlurChangeHandler: DateBlurHandler, resetInput: resetDateInput } = useInput(DateValidator);

	let formIsValid = false;

	if (nameIsValid && cardIsValid && CCVIsValid && DateIsValid) {
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
				{nameHasError && <p className={errorText}>Name must be atleast 5 charachters and only contain letters</p>}
			</div>
			<div className={styles['wrapper-div']}>
				<div className={cardNumberClasses}>
					<label htmlFor="cardnumber">Card Number</label>
					<input type="number" id="cardnumber" maxLength={maxLengthCreditCardNumber} onChange={CardNumberChangeHandler} onBlur={CardNumberBlurHandler} value={enteredCardNumber} />
					{cardHasError && <p className={errorText}>{`Credit card number must be ${maxLengthCreditCardNumber} charachters and only contain numbers`}</p>}
				</div>
				<div className={CCVClasses}>
					<label htmlFor="ccv">CCV</label>
					<input type="number" id="ccv" maxLength={maxLengthCCV} onChange={CCVChangeHandler} onBlur={CCVBlurHandler} value={enteredCCV} />
					{CCVHasError && <p className={errorText}>{`CCV must be ${maxLengthCCV} charachters and only contain numbers`}</p>}
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
