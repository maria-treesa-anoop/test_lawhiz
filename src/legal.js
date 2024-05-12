import React, { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Assuming firestore is exported from firebase.js

const KeywordComparison = () => {
  // State variables
  const [inputText, setInputText] = useState('');
  const [matchingResults, setMatchingResults] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Event handler for input change
  const handleInputChange = (event) => {
    // Convert input text to lowercase and remove whitespace
    setInputText(event.target.value.toLowerCase().trim());
  };

  // Event handler for button click
  const handleButtonClick = async () => {
    setIsProcessing(true); // Set processing state to true
    console.log('Button clicked');
    
    // Fetch data from Firestore
    await fetchData();

    setIsProcessing(false); // Set processing state to false after fetching data
  };

  // Function to fetch data from Firestore
  const fetchData = async () => {
    // Convert user input to an array of lowercase words without whitespace
    const userKeywords = inputText.split(",");
    console.log(userKeywords);
    // Initialize results object
    const results = {};

    try {
      // Get documents from 'ipc' collection
      const querySnapshot = await getDocs(collection(db, 'ipc'));
      console.log('Query snapshot:', querySnapshot);

      // Iterate through each document
      const ipc = querySnapshot.docs.map((doc) => doc.data());
      console.log(ipc);
      console.log('Results:', results);

      setMatchingResults(results); // Update matching results state
    } catch (error) {
      console.error('Error retrieving documents: ', error);
    }
  };

  // JSX
  return (
    <div>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your sentence..."
        rows={4}
        cols={50}
      />
      <button onClick={handleButtonClick} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Compare Keywords'}
      </button>
      <div>
        <h2>Matching Results:</h2>
        <ul>
          {Object.entries(matchingResults).map(([document, count]) => (
            <li key={document}>
              {document}: {count} word{count !== 1 ? 's' : ''} matched {/* Pluralize 'word' if count is greater than 1 */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KeywordComparison;
