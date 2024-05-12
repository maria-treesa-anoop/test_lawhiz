import React, { useState, useEffect } from 'react';
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
    const userKeywords = inputText.split(/\s+/);

    // Initialize results object
    const results = {};

    try {
      // Get documents from 'ipc' collection
      const querySnapshot = await getDocs(collection(db, 'ipc'));
      console.log('Query snapshot:', querySnapshot);

      // Iterate through each document
      querySnapshot.forEach((doc) => {
        const documentData = doc.data(); // Get document data
        const documentName = doc.id; // Get document name
        const documentKeywords = documentData.keywords; // Get document keywords
        
        let matchedKeywordsCount = 0; // Initialize matched keywords count
        
        // Check if document keywords exist
        if (documentKeywords) {
          // Convert document keywords to lowercase and remove whitespace
          const formattedKeywords = documentKeywords.toLowerCase().trim().split(/\s+/);
          
          // Iterate through user keywords and compare with document keywords
          userKeywords.forEach((userKeyword) => {
            if (formattedKeywords.includes(userKeyword)) {
              matchedKeywordsCount++; // Increment count for each match
            }
          });
        }
        
        results[documentName] = matchedKeywordsCount; // Store count in results object
      });

      console.log('Results:', results);

      // Find the top 5 documents with the highest counts
      const sortedResults = Object.entries(results).sort(([, countA], [, countB]) => countB - countA);
      const top5Results = sortedResults.slice(0, 5).reduce((obj, [document, count]) => {
        obj[document] = count;
        return obj;
      }, {});

      setMatchingResults(top5Results); // Update matching results state with the top 5 results
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
