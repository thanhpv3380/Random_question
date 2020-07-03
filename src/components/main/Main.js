import React, { useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';

function Main(props) {
    const [file, setFile] = useState('');
    const [timer, setTimer] = useState('');
    const onHandleClick = (e) =>{
        e.preventDefault();
        if (file){
            ExcelRenderer(file, async (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(typeof(res.rows));
                    let list = [];
                    for (let el of res.rows){
                        //console.log(el[5]);
                        if (el[0]){
                            let data = {
                                question: el[0],
                                answer_1: el[1],
                                answer_2: el[2],
                                answer_3: el[3],
                                answer_4: el[4],
                                result: el[5]
                            }
                            list.push(data);
                        }
                    }

                   // console.log(list);
                    props.getList({list, timer});
                }
            });
        } else {
            alert('You are not add file excel');
        }
    }
    const onHandleChange = (e) =>{
        e.preventDefault();
        setFile(e.target.files[0]);
    }
    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <input type="file" name="file" onChange={onHandleChange} />
                    <input type="text" value={timer} name="timer" placeholder="set time" onChange={(e) => setTimer(e.target.value)} />
                    <button onClick={onHandleClick}>Send...</button>
                </form>
            </div>
        </div>
    );
}

export default Main;