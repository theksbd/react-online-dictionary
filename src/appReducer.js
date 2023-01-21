const INITIAL_STATE = {
  word: '',
  phonetics: [],
  meanings: [],
  spinner: false,
  message: ''
};

const ACTION_TYPE = {
  CHANGE_WORD: 'CHANGE_WORD',
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE'
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_WORD:
      return {
        ...state,
        word: action.payload
      };
    case ACTION_TYPE.FETCH_START:
      return {
        ...state,
        spinner: true,
        word: '',
        message: '',
        phonetics: [],
        meanings: []
      };
    case ACTION_TYPE.FETCH_SUCCESS:
      return {
        ...state,
        spinner: false,
        message: action.payload.word.toUpperCase(),
        phonetics: action.payload.phonetics,
        meanings: action.payload.meanings
      };
    case ACTION_TYPE.FETCH_FAILURE:
      return {
        ...state,
        spinner: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export { INITIAL_STATE, ACTION_TYPE, appReducer };
