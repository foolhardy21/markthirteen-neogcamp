import React, { useState } from 'react'
import styles from './App.module.css'

const App = () => {
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')

  function convertDateToString() {
    const dateArr = date.split('-')
    return {
      day: parseInt(dateArr[2]),
      month: parseInt(dateArr[1]),
      year: parseInt(dateArr[0]),
    }
  }
  function getDateAsString(birthdate) {
    let dateInStr = { day: '', month: '', year: '' };

    if (birthdate.day < 10) {
      dateInStr.day = '0' + birthdate.day;
    }
    else {
      dateInStr.day = birthdate.day.toString();
    }

    if (birthdate.month < 10) {
      dateInStr.month = '0' + birthdate.month;
    }
    else {
      dateInStr.month = birthdate.month.toString();
    }

    dateInStr.year = birthdate.year.toString();
    return dateInStr;
  }
  function getDateInAllFormats(birthdate) {
    let ddmmyyyy = birthdate.day + birthdate.month + birthdate.year;
    let mmddyyyy = birthdate.month + birthdate.day + birthdate.year;
    let yyyymmdd = birthdate.year + birthdate.month + birthdate.day;
    let ddmmyy = birthdate.day + birthdate.month + birthdate.year.slice(-2);
    let mmddyy = birthdate.month + birthdate.day + birthdate.year.slice(-2);
    let yyddmm = birthdate.year.slice(-2) + birthdate.day + birthdate.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }
  function reverseString(str) {
    let listOfChars = str.split('');
    let reversedListOfChar = listOfChars.reverse();
    let reversedString = reversedListOfChar.join('');
    return reversedString;
  }
  function isStringPalindrome(str) {
    let reversedString = reverseString(str);
    return str === reversedString;
  }
  function checkPalindromeForAllFormats(birthdate) {
    let dateFormatList = getDateInAllFormats(birthdate);
    let palindromeList = [];

    for (let i = 0; i < dateFormatList.length; i++) {
      let result = isStringPalindrome(dateFormatList[i]);
      palindromeList.push(result);
    }
    return palindromeList;
  }
  function isLeapYear(year) {

    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
  }
  function getNextDate(birthdate) {
    let day = birthdate.day + 1;
    let month = birthdate.month;
    let year = birthdate.year;
  
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  function getNextPalindromeDate(birthdate) {

    let nextDate = getNextDate(birthdate);
    let ctr = 0;
  
    while (1) {
      ctr++;
      let dateStr = getDateAsString(nextDate);
      let resultList = checkPalindromeForAllFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }
  function getPreviousDate(birthdate) {
    let day = birthdate.day - 1;
    let month = birthdate.month;
    let year = birthdate.year;
  
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      }
      else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        }
        else {
          day = 28;
        }
      }
      else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  function getPreviousPalindromeDate(birthdate) {

    let previousDate = getPreviousDate(birthdate);
    let ctr = 0;
  
    while (1) {
      ctr++;
      let dateStr = getDateAsString(previousDate);
      let resultList = checkPalindromeForAllFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, previousDate];
        }
      }
      previousDate = getPreviousDate(previousDate);
    }
  }
  function checkIfPalindrome(e){
    e.preventDefault()
    if (!date) {
      setMessage('Enter the date')
    } else {

      const birthdate = convertDateToString()
      let birthdateStr = getDateAsString(birthdate)
      let list = checkPalindromeForAllFormats(birthdateStr)
      let isPalindrome = false;
      
      for (let i = 0; i < list.length; i++) {
        if (list[i]) {
          isPalindrome = true;
          break;
        }
      }
      if (!isPalindrome) {
        const [ctr1, nextDate] = getNextPalindromeDate(birthdate);
        const [ctr2, prevDate] = getPreviousPalindromeDate(birthdate);
        
        if (ctr1 > ctr2) {
          setMessage(`The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`)
        } else {
          setMessage(`The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`)
        }
        
      } else {
        setMessage('Yay! Your birthday is palindrome!')
      }
    }
  }
  return (
    <div>
      <h3 className={styles.heading}>palindrome birthday</h3>
      <form className={styles.form_div} onSubmit={checkIfPalindrome}>
        <label>enter your birth date</label><br />
        <input className={styles.form_input} type='date' value={date} onChange={(e) => setDate(e.target.value)} /><br />
        <input type='submit' value='submit' />
      </form>
      <div className={styles.verdict}>{
        message && `${message}`
      }</div>
    </div>
  );
}

export default App;
