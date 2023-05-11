import React, { useState } from "react";

export default function Vocabset() {
  const [inputs, setInputs] = useState({ german: "", french: "" });
  const [vocabs, setVocabs] = useState([]);

  function changeInput(lang, value) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [lang]: value
    }));
  }

  function pushVocab() {
    const newVocab = { german: inputs.german, french: inputs.french };
    setVocabs((prevVocabs) => [...prevVocabs, newVocab]);
    setInputs({ german: "", french: "" });
  }

  // Child component to render the vocabulary list
  function VocabularyList() {
    return (
      <ul>
        {vocabs.map((vocab, index) => (
          <li className="vocabPair" key={index}>
            <h1>{vocab.french}</h1>
            <h1>{vocab.german}</h1>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="setRenderer">
      <input
        onChange={(e) => changeInput("german", e.target.value)} placeholder="german" type="text" value={inputs.german}
      />
      <input
        onChange={(e) => changeInput("french", e.target.value)} placeholder="french" type="text" value={inputs.french}
      />
      <button onClick={pushVocab}> Push </button>
      <div>
        <div className="infoH1">
          <h1>German</h1>
          <h1>French</h1>
        </div>
        <VocabularyList />
      </div>
    </div>
  );
}