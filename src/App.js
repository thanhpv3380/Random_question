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
        const list = randomList(data.list);
        setList(list);
        setTimer(data.timer);
        setPlay(true);
    }
    const randomList = (data) =>{
        const x = Math.round(data.length/2);
        const numberRandomList = Math.floor(Math.random() * data.length) + x;  
        //console.log(numberRandomList);
        for (let i = 1; i <= numberRandomList; i++){

            const random_1 = Math.floor(Math.random() * data.length);
            const random_2 = Math.floor(Math.random() * data.length);
            
            let temp = {...data[random_1]};
            data[random_1] = {...data[random_2]};
            data[random_2] = {...temp};

            //console.log(data[random_1]);
            //console.log(data[random_2]);
        }
        
        for (let i = 0; i < data.length; i++){
            let rs = [];
    
            let answer = [];
            
            answer.push(data[i].answer_1);
            answer.push(data[i].answer_2);
            answer.push(data[i].answer_3);
            answer.push(data[i].answer_4);

            // let check = [];
            //console.log(check[2]);
            for (let j = 1; j <= 4; j++){ 
                let random = Math.floor(Math.random() * 4);
                //console.log(random);
                while (rs.indexOf(random) >= 0){
                    random = Math.floor(Math.random() * 4);
                }
                rs.push(random);
               
            }
            let result = data[i].result.toString().split(",");
            let newResult = [];
            for (let el in result){
                for (let j = 0; j < 4; j++){
                    if (result[el]-1 === rs[j]){
                        newResult.push(j+1);
                        break;
                    }
                }
            }
            data[i].result = newResult.toString();
            //console.log(rs);
            
            data[i].answer_1 = answer[rs[0]];
            data[i].answer_2 = answer[rs[1]];
            data[i].answer_3 = answer[rs[2]];
            data[i].answer_4 = answer[rs[3]];
            
        }
        return data;
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
