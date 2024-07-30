export const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => ({
  type: 'SET_FIELD',
  payload: {
    name: event.target.name,
    value: event.target.value,
  },
});

export const inputCheckChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => ({
  type: 'SET_CHECK',
  payload: {
    name: event.target.name,
    value: event.target.checked,
  },
});
