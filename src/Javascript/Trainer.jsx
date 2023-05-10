import React, { useState, useEffect } from 'react';

export default function Trainer() {
    const [vocabArray, setVocabArray] = useState([
        { ger: 'Hallo', fra: 'Bonjour' },
        { ger: 'Tschüss', fra: 'Au revoir' },
        { ger: 'Ja', fra: 'Oui' },
        { ger: 'Nein', fra: 'Non' },
        { ger: 'Und', fra: 'Et' },
        { ger: 'oder', fra: 'ou' }
    ]);
    const [usedIndices, setUsedIndices] = useState([]);

    const [inputVocab, setInputVocab] = useState('');
    const [feedbackType, setFeedbackType] = useState('');
    const [messageType, setMessageType] = useState('');

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLanguage, setCurrentLanguage] = useState('ger');

    const [conclusion, setConclusion] = useState(false)
    let [vocabCorrect, setVocabCorrect] = useState(0);
    let [vocabIncorrect, setVocabIncorrect] = useState(0);

    useEffect(() => {
        setUsedIndices([])
        changeWord();
    }, []);
    const Icon = (props) => {
        const icon = props.feedbackType === 'Correct' ? 'done' : 'close';
        return (
            <span
                className="material-symbols-rounded"
                style={{ color: props.color, fontSize: props.fontSize }}
            >
                {icon}
            </span>
        );
    }

    function evaluate() {
        const currentVocab = vocabArray[currentIndex];
        const input = inputVocab.trim().toLowerCase();
        const wordToCheck =
            currentLanguage === 'ger'
                ? currentVocab.fra.toLowerCase()
                : currentVocab.ger.toLowerCase();

        if (input === wordToCheck) {
            changeWord();
            setInputVocab('');
            setMessageType('#2A9D8F');
            setFeedbackType('Correct');
            setVocabCorrect(vocabCorrect += 1);
        } else {
            setInputVocab('');
            setMessageType('#E76F51');
            setFeedbackType('Incorrect');
            setVocabIncorrect(vocabIncorrect += 1);
        }
    }

    function runVocabtest() {
        setVocabCorrect(0)
        setInputVocab(0)
        setUsedIndices([]);
        setCurrentIndex(0);
        setCurrentLanguage('ger');
        setConclusion(false);
    }

    const Conclusion = () => {
        const conclusionStyleSet = {
            color: '#264653',
            fontSize: '5vh'
        };

        return (
            <div className='conclusion'>
                <h1 style={conclusionStyleSet}> Your Evaluation </h1>
                <div>
                    <h1 style={conclusionStyleSet}> Time took: 00:00:00 </h1>
                    <h1 style={conclusionStyleSet}> Correct: {vocabCorrect}</h1>
                    <h1 style={conclusionStyleSet}> Incorrect: {vocabIncorrect}</h1>
                </div>
                <button onClick={() => { runVocabtest(); }} className='retryButton'> Try Again </button>
            </div>
        );
    };

    function renderConclusion() {
        setConclusion(true)
    }

    function changeWord() {
        if (usedIndices.length === vocabArray.length) {
            renderConclusion();
            setUsedIndices([]);
            setCurrentIndex(0); 
            setCurrentLanguage('ger');
            console.info('conlusion incomming')
        } else {
            let randomIndex = Math.floor(Math.random() * vocabArray.length);
            while (usedIndices.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * vocabArray.length);
            }
            setCurrentIndex(randomIndex);
            setCurrentLanguage(Math.random() < 0.5 ? 'ger' : 'fra');
            setUsedIndices(prevIndices => [...prevIndices, randomIndex]);
        }
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            evaluate();
        }
    }

    const FeedBackMessage = (props) => {
        return (
            <div className="feedbackContainer" style={{ textAlign: 'center' }}>
                <p
                    className="feedbackMessage"
                    style={{
                        fontSize: props.fontSize,
                        margin: '0',
                        color: props.colorType,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {props.type} <Icon color={props.colorType} fontSize={props.fontSize} feedbackType={props.feedbackType} />
                </p>
            </div>
        );
    };

    const Statistics = (props) => {
        return (
            <div className="statistics">
                <h1>
                    {usedIndices.length} / {vocabArray.length} -
                    Right  : {vocabCorrect} Wrong  : {vocabIncorrect}
                </h1>
            </div>
        );
    };

    return (
        <>
            <div className="vocabContainer">
                <h1>{currentLanguage === 'ger' ? vocabArray[currentIndex].ger : vocabArray[currentIndex].fra}</h1>
                <div>
                    <input
                        type="text"
                        value={inputVocab}
                        onChange={(e) => setInputVocab(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <FeedBackMessage
                    type={feedbackType}
                    fontSize="10vh"
                    colorType={messageType}
                    feedbackType={feedbackType}
                />
            </div>
            <Statistics />
            {conclusion && <Conclusion />}
        </>
    );
}