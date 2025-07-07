import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import FadeLoader from 'react-spinners/FadeLoader';

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
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const ai = new GoogleGenAI({ apiKey: 'AIzaSyCGLpOYWIgalBgc6sFiOeSzSmcCIf3h4ao' });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1a1128',
      borderColor: '#a855f7',
      color: '#fff',
      minWidth: '200px',
      borderRadius: '0.75rem',
      padding: '6px',
      boxShadow: '0 0 0 1px #a855f7'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1a1128',
      color: '#fff',
      borderRadius: '0.5rem'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#7e22ce' : '#1a1128',
      color: '#fff',
      cursor: 'pointer'
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#d1aaff',
    }),
  };

  async function reviewcode() {
    if (!code.trim()) {
      alert('Please enter code to review.');
      return;
    }
    setResponse('');
    setLoading(true);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a skilled software developer reviewing the following ${selectedOption.value} code:\n\n${code}\n\nGive a detailed review as a senior developer.`
    });
    setResponse(response.text);
    setLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0213] via-[#1c042d] to-[#11001c] text-white font-sans">
      <Navbar />

      {/* SPACING BELOW NAVBAR */}
      <div style={{ marginTop: '60px' }}>
        <div className="px-4 py-6">
          <div className="flex flex-col md:flex-row flex-grow gap-10">

            {/* Left Panel */}
            <div className="w-full md:w-1/2 flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row gap-8 items-stretch sm:items-center justify-between">
                <Select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e)}
                  options={options}
                  styles={customStyles}
                />
                <button
                  onClick={reviewcode}
                  className="glow-button"
                >
                  Review Code
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#7e22ce] shadow-md">
                <Editor
                  height="400px"
                  theme="vs-dark"
                  language={selectedOption.value}
                  value={code}
                  onChange={(e) => setCode(e)}
                />
              </div>
            </div>

            {/* Right Panel */}
            <div className="glass-card w-full md:w-1/2 p-6 overflow-y-auto response-panel max-h-[80vh]">
              <h2 className="text-2xl font-bold mb-4 border-b border-purple-600 pb-2 text-purple-300">
                &nbsp;&nbsp;Response
              </h2>


              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <FadeLoader color="#d946ef" />
                </div>
              ) : (
                <Markdown>{response}</Markdown>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;