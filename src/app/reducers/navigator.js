import { StackActions, NavigationActions } from 'react-navigation';
import * as Actions from '../actions/navigator';

const { RootNavigator } = Actions;
const { router } = RootNavigator;


const initialAction = router.getActionForPathAndParams(Actions.ACTION_OPEN_SPLASH.routeName);
const initialState = router.getStateForAction(initialAction);

export default function navigation(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case Actions.ACTION_OPEN_SPLASH.action:
      nextState = router.getStateForAction(
        NavigationActions.navigate({
          routeName: Actions.ACTION_OPEN_SPLASH.routeName
        }),
        state
      );
      break;
    case Actions.ACTION_OPEN_LOGIN_FLOW.action:
      nextState = router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: Actions.ACTION_OPEN_LOGIN_FLOW.routeName
            })
          ],
        }),
        state
      );
      break;
    default:
      nextState = router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}
