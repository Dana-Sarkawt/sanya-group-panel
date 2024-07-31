export function FilterTextFieldToNumbers(event: Event) {
  // make sure to filter to only input numbers
  let input = event.target as HTMLInputElement;
  let value = input.value;
  let regex = new RegExp("^[0-9]*$");
  if (!regex.test(value)) {
    input.value = value.substring(0, value.length - 1);
  }
  return input.value;
}
