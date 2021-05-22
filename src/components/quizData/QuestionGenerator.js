import React, {useState} from 'react'
import db, { auth, storageRef } from "../../firebase";
import "../../css/QuizEngine.css" 
import "../../css/QuestionGenerator.css" 

function QuestionGenerator() {

    const [text, setText] = useState("Muhammad Ali Jinnah 25 December 1876 – 11 September 1948 was a barrister, politician and the founder of Pakistan. Jinnah served as the leader of the All-India Muslim League from 1913 until the inception of Pakistan on 14 August 1947, and then as the Dominion of Pakistan's first Governor-General until his death. He is revered in Pakistan as the Quaid-i-Azam (Great Leader) and Baba-i-Qaum (Father of the Nation). His birthday is observed as a national holiday in Pakistan.")
    var fileUrl = ""

    const convert = async e =>{
        const file = e.target.files[0];
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        fileUrl = await fileRef.getDownloadURL()
        console.log(fileUrl)
        if(fileUrl){
        fetch("http://localhost:80/converttoText", {
            headers: {
                'Content-Type': 'application/json'
              },
              // Specify the method
              method: 'POST',
              // A JSON payload
              body: JSON.stringify(
                  fileUrl
              )
          }).then(function (response) { // At this point, Flask has printed our JSON  
            console.log('POST response: ');
            // console.log(response.text())
            return response.json();
          })}
    }

    return(
        <div className="body">
            <div className="box">
                <div className="scontainer">
                    <h2>Generate Your Own Quiz</h2>
                    <p>Want to test whatever you've learnt? Enter the text and we'll generate practice questions for you!</p>
                    <br></br>
                    <div>
                        <h3>Paste your Text</h3>
                        <form>
                            <div className="textArea">
                                <textarea value={text} onChange={e => setText(e.target.value)} className="sample-text">
                                </textarea>
                                <div>
                                    <img src="https://media3.giphy.com/media/PnsF0HweRIw2A7K9yp/source.gif" width="200px" height="200px"></img>
                                </div>
                            </div>
                            <h3>OR</h3>
                            <label>Add File: </label>
                            <input onChange={convert} id="file" type="file" accept=".txt"></input>
                            <div className="sbutton"><button className="scover-button" type="submit">Generate Questions</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionGenerator