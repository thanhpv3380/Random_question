import React, { useState } from 'react';
import './App.css';

//components
import Main from './components/main/Main';
import Practice from './components/practice/Practice';

function App() {
    const [play, setPlay] = useState(false);
    const [list, setList] = useState([]);
    const [timer, setTimer] = useState(0);
    const getList = (data)=>{
        setList(data.list);
        setTimer(data.timer);
        setPlay(true);
    }
    return (
        <div className="App">
            {
                !play ?
                    <Main getList={getList} />  
                :
                    <Practice list={list} timer={timer} />
            }
        </div>
    );
}

export default App;
