export function FilterTextFieldToNumbers(event: Event) {
	// make sure to filter to only input numbers
	const input = event.target as HTMLInputElement;
	const value = input.value;
	const regex = new RegExp('^[0-9]*$');
	if (!regex.test(value)) {
		input.value = value.substring(0, value.length - 1);
	}
	return input.value;
}
