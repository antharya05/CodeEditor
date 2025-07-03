import React, { useState } from 'react';
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import FadeLoader from "react-spinners/FadeLoader";
const App = () => {
  const options = [
    { value: 'cpp', label: 'C++' },
    { value: 'C', label: 'C' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'rust', label: 'Rust' }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#18181b', // dark background (similar to bg-zinc-900)
      borderColor: '#3f3f46',
      color: '#fff',
      width: "100%"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#18181b', // dropdown bg
      color: '#fff',
      width: "100%"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',  // selected option text
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#27272a' : '#18181b',  // hover effect
      color: '#fff',
      cursor: 'pointer',
      // width: "30%"
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
      width: "100%"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a1a1aa',  // placeholder text color
      width: "100%"
    }),
  };
  const [code, setCode] = useState("");
  const ai = new GoogleGenAI({ apiKey: "AIzaSyCGLpOYWIgalBgc6sFiOeSzSmcCIf3h4ao" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  async function reviewcode() {
    setResponse("")
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a skilled software developer who writes clean and efficient code. A user is sharing some code written in ${selectedOption.value}.

Your task is to carefully review the code and give the following:

1. Rate the code quality as: Excellent, Good, Average, or Poor.
2. Suggest ways to improve the code, including better methods or best practices.
3. Explain what the code is doing, step by step.
4. Point out any possible bugs or logic mistakes.
5. Mention any syntax or runtime errors you find.
6. Give clear advice on how to fix the issues you found.

Review it like a senior developer looking at a teammate’s code.
Code:${code}
`,

    });
    console.log(response.text);
    setLoading(false);
    setResponse(response.text)
  }
  return (
    <>
      <Navbar />
      <div className="main flex justify-between" style={{ height: "calc(100vh - 90px)" }}>
        <div className="left h-[87%] w-[50%]">
          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex items-center gap-[100px]" >
            <Select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e)}
              options={options}
              styles={customStyles}
            />
            <button onClick={() => {
              if (code === "") {
                alert("please enter code")
              }
              else {
                reviewcode()
              }
            }
            }
              className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Review</button>
          </div>
          <Editor height="100%" theme="vs-dark" language={selectedOption.value} value={code} onChange={(e) => { setCode(e) }} />
        </div>
        <div className="right overflow-scroll !p-[10px] bg-zinc-900 w-[50%] h-[100%]">
          <div className="toptab border-y-3 border-zinc-300 dark:border-zinc-600 flex items-center justify-between h-[60px]">
            <p className='font-[700] text-[17px]'>Response</p>
          </div>
          {loading && <FadeLoader color="white" />}
          <Markdown>{response}</Markdown>
        </div>
      </div >
    </>
  );
};

export default App;
