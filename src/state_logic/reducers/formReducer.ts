import {
  IReducersFormReducerActions,
  IReducersFormReducerState,
} from '../../utils/interfaces';

export default function formReducer(
  state: IReducersFormReducerState,
  action: IReducersFormReducerActions
) {
  switch (action.type) {
    case 'SET_FIELD' || 'SET_CHECK':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    // case 'SET_ERRORS':
    //   return { ...state, errors: payload.errors };
    default:
      return state;
  }
}
