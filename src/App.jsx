import { useReducer } from 'react';
import { ACTION_TYPE, appReducer, INITIAL_STATE } from './appReducer';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const handleChangeWord = e => {
    dispatch({ type: ACTION_TYPE.CHANGE_WORD, payload: e.target.value });
  };

  const handleClickSubmit = async e => {
    e.preventDefault();
    try {
      if (!state.word) {
        alert('Please enter a word to search');
        return;
      }
      dispatch({ type: ACTION_TYPE.FETCH_START });

      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${state.word}`
      );
      const data = await response.json();
      console.log('🚀 ~ file: App.jsx:16 ~ handleClickSubmit ~ data', data);

      if (!response.ok) {
        dispatch({ type: ACTION_TYPE.FETCH_FAILURE, payload: data });
        return;
      }
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS, payload: data[0] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <header>
        <div className='navbar'>
          <div className='logo'>
            <h2>Free Online Dictionary</h2>
          </div>
        </div>
      </header>

      <main>
        <section className='showcase'>
          <form id='form'>
            <h1>The world's most accurate machine dictionary</h1>
            <div className='form-control'>
              <input
                type='text'
                id='text'
                placeholder='Enter Word'
                value={state.word}
                onChange={handleChangeWord}
              />
            </div>
            <button type='submit' className='btn' onClick={handleClickSubmit}>
              Submit
            </button>
          </form>
        </section>

        <section className='result'>
          <h2>{state.message}</h2>
          <div className='result-container'>
            <div className='result-container__item result-container__phonetic'>
              <h2>Phonetic</h2>
              {state.phonetics.map((phonetic, index) => {
                return (
                  <div key={index} className='phonetic-item'>
                    {phonetic.audio && (
                      <audio src={phonetic.audio} controls></audio>
                    )}
                    {phonetic.text && <p>{phonetic.text}</p>}
                  </div>
                );
              })}
            </div>
            <div className='result-container__item result-container__definition'>
              <h2>Definition</h2>
              {state.meanings.map((meaning, index) => {
                return (
                  <div key={index} className='definition-item'>
                    <h4>
                      {index +
                        1 +
                        '. ' +
                        meaning.partOfSpeech.at(0).toUpperCase() +
                        meaning.partOfSpeech.slice(1)}
                    </h4>
                    {meaning.definitions.map((definition, index) => {
                      return (
                        <div key={index} className='definition'>
                          <p className='definition__title'>
                            {definition.definition}
                          </p>
                          {definition.example && (
                            <p className='title'>
                              <span>Example: </span>
                              {definition.example}
                            </p>
                          )}
                          {definition.synonyms.length > 0 && (
                            <p className='title'>
                              <span>Synonym: </span>
                              {definition.synonyms.join(', ')}
                            </p>
                          )}
                          {definition.antonyms.length > 0 && (
                            <p className='title'>
                              <span>Antonym: </span>
                              {definition.antonyms.join(', ')}
                            </p>
                          )}
                        </div>
                      );
                    })}
                    {meaning.synonyms.length > 0 && (
                      <p className='conclusion'>
                        <span>Synonym: </span>
                        {meaning.synonyms.join(', ')}
                      </p>
                    )}
                    {meaning.antonyms.length > 0 && (
                      <p className='conclusion'>
                        <span>Antonym: </span>
                        {meaning.antonyms.join(', ')}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            {/* <div className='result-container__item result-container__example'>
              <h2>Example</h2>
            </div>
            <div className='result-container__item result-container__synonym'>
              <h2>Synonym</h2>
            </div>
            <div className='result-container__item result-container__antonym'>
              <h2>Antonym</h2>
            </div> */}
          </div>
        </section>
      </main>

      <div className={state.spinner ? 'spinner show' : 'spinner'}></div>
    </div>
  );
}

export default App;
