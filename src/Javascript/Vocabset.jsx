import React, { useState } from 'react';

function Interface({ vocabArray, syncVocabArray }) {
  const [inputs, setInputs] = useState({ ger: '', fra: '' });

  function pushElement() {
    const newVocabArray = [...vocabArray, { fra: inputs.fra, ger: inputs.ger }];
    syncVocabArray(newVocabArray);
    setInputs({ ger: '', fra: '' });
  }

  function setValue(lang, e) {
    const { value } = e.target;
    const newInputs =
      lang === 'ger' ? { ...inputs, ger: value } :
        lang === 'fra' ? { ...inputs, fra: value } :
          console.error();
    setInputs(newInputs);
  }

  return (
    <div className='setRenderer'>
      <input placeholder='german' type='text' value={inputs.ger} onChange={(e) => { setValue('ger', e) }} />
      <input placeholder='french' type='text' value={inputs.fra} onChange={(e) => { setValue('fra', e) }} />
      <button onClick={pushElement}>Push</button>
      <ul>
        {vocabArray.map((vocab, index) => (
          <li key={index}>
            <h1>{vocab.ger}</h1>
            <h1>{vocab.fra}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Vocabset() {
  const [vocabArray, setVocabArray] = useState([
    { ger: 'Hallo', fra: 'Bonjour' },
    { ger: 'Tschüss', fra: 'Au revoir' },
    { ger: 'Ja', fra: 'Oui' },
    { ger: 'Nein', fra: 'Non' },
    { ger: 'Und', fra: 'Et' },
    { ger: 'oder', fra: 'ou' }
  ]);

  function syncVocabArray(newVocabArray) {
    setVocabArray(newVocabArray);
  }

  return (
    <>
      <Interface vocabArray={vocabArray} syncVocabArray={syncVocabArray} />
    </>
  );
}
