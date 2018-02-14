export default function counter (state = {key: []}, action) {
  switch (action.type) {
    case 'RESPONSE':
      return action.response
    default:
      return state
  }
}
