export const required = value => value ? undefined : 'Field is required';
export const nonEmpty = value => value.trim() !== '' ? undefined : 'Field must not be empty';
export const charLengthFive = value => value.length === 5 ? undefined : 'Field must be five characters long';
export const isNumber = value => !isNaN(value) ? undefined : 'All characters must be a number';
