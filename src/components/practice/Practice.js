import React, { useState, useEffect } from 'react';

function Practice(props) {
    const [quesNum, setQuesNum] = useState(1);
    const [timer, setTimer] = useState(props.timer);
    const [result, setResult] = useState([]);
    const [displayResult, setDisplayResult] = useState(() => {
        //console.log('test');
        let newDisplayResult = [];
        for (let i in props.list) {
            let data = {
                answer_1: '',
                answer_2: '',
                answer_3: '',
                answer_4: ''
            };
            newDisplayResult.push(data);
        }
        //console.log(newDisplayResult);
        return newDisplayResult;
    });

    useEffect(() => {
        const intervalIndex = setInterval(() => {
            if (timer !== undefined){
                if (timer > 0) setTimer(timer - 1);   
                else {
                    alert('time out...');
                    clearInterval(intervalIndex);
                }
            } else {
                clearInterval(intervalIndex);
            }
        }, 1000);
        return () => clearInterval(intervalIndex);
    }, [timer]);

    const onHandleBack = () => {
        if (quesNum > 1) {
            setQuesNum(quesNum - 1);
        }
    }
    const onHandleNext = () => {
        if (quesNum < props.list.length) {
            setQuesNum(quesNum + 1);
        }
    }
    const onHandleClickQuestion = (question) => {
        setQuesNum(question);
        //console.log('test');
    }
    const onHandleClickAnswer = (answer) => {
        let newDisplayResult = [...displayResult];
        let newResult = [...result];
        newDisplayResult[quesNum - 1] = {
            answer_1: '',
            answer_2: '',
            answer_3: '',
            answer_4: ''
        };
        if (props.list[quesNum - 1].result === answer) {
            //console.log('true');
            newResult[quesNum - 1] = true;

        } else {
            //console.log('false');
            newResult[quesNum - 1] = false;
        }
        let style = newResult[quesNum - 1] ? 'box-green' : 'box-red';

        switch (answer) {
            case 1:
                newDisplayResult[quesNum - 1].answer_1 = style;
                break;
            case 2:
                newDisplayResult[quesNum - 1].answer_2 = style;
                break;
            case 3:
                newDisplayResult[quesNum - 1].answer_3 = style;
                break;
            default:
                newDisplayResult[quesNum - 1].answer_4 = style;
        }
        setDisplayResult(newDisplayResult);
        setResult(newResult);
        // setTimeout(() =>{
        //     // setDisplayResult([]);
        //     if (quesNum < props.list.length){
        //         setQuesNum(quesNum+1);
        //     } else {
        //         alert("you have done exam. Congrat...!!!")
        //     }
        // }, 2000);
    }
    return (
        <div>
            {timer ? <div className="timer"><i className="fa fa-clock-o">{timer}</i></div> : ''}
            <div className="content">
                <div className="question">
                    <span>Cau {quesNum}: </span>
                    <p>{props.list[quesNum - 1].question} </p>

                </div>
                <div className="container mb-3">
                    <div className="row">
                        <div className={`col-sm-5 answer ${displayResult[quesNum - 1].answer_1}`} onClick={() => onHandleClickAnswer(1)}>
                            A. {props.list[quesNum - 1].answer_1}
                        </div>
                        <div className="col-sm-2">
                        </div>
                        <div className={`col-sm-5 answer ${displayResult[quesNum - 1].answer_2}`} onClick={() => onHandleClickAnswer(2)}>
                            B. {props.list[quesNum - 1].answer_2}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className={`col-sm-5 answer ${displayResult[quesNum - 1].answer_3}`} onClick={() => onHandleClickAnswer(3)}>
                            C. {props.list[quesNum - 1].answer_3}
                        </div>
                        <div className="col-sm-2">
                        </div>
                        <div className={`col-sm-5 answer ${displayResult[quesNum - 1].answer_4}`} onClick={() => onHandleClickAnswer(4)}>
                            D. {props.list[quesNum - 1].answer_4}
                        </div>
                    </div>
                </div>
                <div className="box-btn mt-3">
                    <div className="btn btn-danger mr-1" onClick={onHandleBack}>Back</div>
                    <div className="btn btn-primary" onClick={onHandleNext}>Next</div>
                </div>
            </div>
            <div className="content q-list">
                {
                    props.list.map((el, index) => {
                        let style = 'q-box ';
                        style += result[index] === undefined ? '' : result[index] ? 'box-green' : 'box-red';

                        return <div key={index} className={style} onClick={() => onHandleClickQuestion(index + 1)}>{index + 1}</div>
                    })
                }

            </div>
        </div>
    );
}

export default Practice;