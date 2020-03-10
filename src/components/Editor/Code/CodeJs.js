import React from 'react';
import classes from './CodeJs.module.css';

const code = (props) => {
    const _code = props.data


    // CHARACTERS 
    // WORDS
    // LINES
    const code_data = [] //For saving all code

    const _line_code = [] //For saving all code in one line

    const _jsx_elements = [] // For saving JSX elements

    let jsx_started = false // Flag fot checking whether HTML started or not

    let string_started = "" // Flag for checking whether string started or not

    let comment_started = false // Flag for checking whether Comment is started or not

    let _character, _word = "", _line = "", _prev_word = "", _prev_line = "";

    // CHARACTER CHECK THIS FUNCTION WILL RETURN A BOOLEAN WHETHER NEED TO ADD TO 'WORD'
    const characterCheck = (char, index) => {
        // If single quotes, double quotes
        // (,),{,},=,<,>,/,+,-,*,/ ,; ---- If not JSX started and JSX started

        // CHECKING JSX IS STARTED OR NOT 
        // 1. if prev_word = (, return, =, =>  JSX starts
        if (!jsx_started) {
            if (char === "<") {
                console.log("Previous character ", _prev_word)
                if (_prev_word === "=" || _prev_word === "(" || _prev_word === "return" || _prev_word === "=>" || _word.charAt(_word.length - 1) === "=" || _word.charAt(_word.length - 1) === "(") {
                    jsx_started = true
                    _prev_word = ""
                    return true
                }
            }
            // CHECKING FOR STRING OR NOT
            // ", ', `
            if (char === "'" || char === "\"" || char === "`") {
                // if string started make false else true
                if (string_started === "") {
                    // This is starting of string
                    string_started = char
                } else if (string_started === char) {
                    _word += char
                    string_started = ""
                    // PUSH THE WORD HERE
                    _line_code.push(<span className={classes.String}>{_word}</span>)
                    _word = ""
                    return false
                }
            } else {
                _prev_word = char
                if ((char === ";" || char === "(" || char === ")" || char === "{" || char === "}" || char === ":" || char === "." || char === "," || char === "+" || char === "-" || char === "*" || char === "[" || char === "]") && string_started === "" && !comment_started) {
                    if (char === "(")
                        wordChecker(_word, true)
                    else
                        wordChecker(_word)
                    _word = ""
                    _line_code.push(<span className={classes.Constant}>{char}</span>)
                    return false
                }
                else if (char >= '0' && char <= '9') {
                    // This is a Number
                    if (_word.charAt(_word.length - 1) == "=" || _word.charAt(_word.length - 1) == "" || _word.charAt(_word.length - 1) == "." || _word.charAt(_word.length - 1) == ",") {
                        // This is a number
                        if (_word === ".")
                            _line_code.push(<span className={classes.Number}>{_word}</span>)
                        else
                            wordChecker(_word)
                        _word = ""
                        _line_code.push(<span className={classes.Number}>{char}</span>)
                        return false
                    }
                } else if (char === "=") {
                    wordChecker(_word)
                    _word = ""
                    _prev_word = "="
                    _line_code.push(<span className={classes.Number}>{char}</span>)
                    return false

                } else if (_prev_word === "=" && char === ">") {
                    _word = ""
                    _prev_word = ">"
                    _line_code.push(<span className={classes.Number}>{char}</span>)
                    return false
                }
            }
        }
        else {
            if (char === "'" || char === "\"" || char === "`") {
                // if string started make false else true
                if (string_started === "") {
                    // This is starting of string
                    string_started = char
                } else if (string_started === char) {
                    _word += char
                    string_started = ""
                    // PUSH THE WORD HERE
                    _line_code.push(<span className={classes.String}>{_word}</span>)
                    _word = ""
                    return false
                }
            } else {
                if ((char === "{" || char === "}") && string_started === "" && !comment_started) {
                    wordChecker(_word)
                    _word = ""
                    _line_code.push(<span className={classes.Variable}>{char}</span>)
                    return false
                } else if (char === "=") {
                    wordChecker(_word)
                    _word = ""
                    _line_code.push(<span className={classes.Number}>{char}</span>)
                    return false
                }
                 else if (char === ">") {
                    if (_word === "/") {
                        _word += char
                        otherWordChecker(_word)
                    }
                    else{
                        wordChecker(_word)
                        _line_code.push(<span className={classes.Jsx}>{char}</span>)
                    }
                    
                    if (_jsx_elements.length === 0) jsx_started = false
                    _word = ""
                    _prev_word = char
                    return false
                } else if (char === "/") {
                    if (_prev_word === '<') {
                        _word = ""
                        _line_code.push(<span className={classes.Jsx}>{char}</span>)
                        _jsx_elements.pop()
                        _prev_word = char
                        return false
                    }
                }
            }

        }


        return true
    }



    // OTHER WORD CHECKER (LIKE => AND OTHERS)
    const otherWordChecker = (current_word) => {

        // =>
        // </
        // />
        // //
        if (current_word === "//") {
            comment_started = true
        }
        // < if JSX started
        if (current_word === "<" && jsx_started) {
            _line_code.push(<span className={classes.Jsx}>{current_word}</span>)
            _prev_word = current_word
            _word = ""
        }
        if (current_word === "/>" && jsx_started) {
            _jsx_elements.pop()
            _line_code.push(<span className={classes.Jsx}>{current_word}</span>)
            _word = ""
            if (_jsx_elements.length === 0)
                jsx_started = false
        }
        if (current_word === "console" && !jsx_started) {
            _line_code.push(<span className={classes.JsxCustom}>{current_word}</span>)
            _word = ""
        }

    }


    // NORMAL WORD CHECKER 
    const wordChecker = (current_word, flag = false) => {
        current_word = current_word.trim()
        // FOR JSX
        if (jsx_started) {
            if (_prev_word === '<') {
                _jsx_elements.push(current_word)
                _prev_word = ""
                if (current_word.charAt(0) >= 'A' && current_word.charAt(0) <= 'Z')
                    _line_code.push(<span className={classes.JsxCustom}>{current_word}</span>)
                else
                    _line_code.push(<span className={classes.Variable}>{current_word}</span>)

            } else if (_prev_word === "/") {
                _prev_word = ""
                if (current_word.charAt(0) >= 'A' && current_word.charAt(0) <= 'Z')
                    _line_code.push(<span className={classes.JsxCustom}>{current_word}</span>)
                else
                    _line_code.push(<span className={classes.Variable}>{current_word}</span>)
            } else if (current_word === "/>") {
                _jsx_elements.pop()
                _line_code.push(<span className={classes.Jsx}>{current_word}</span>)
            } else {
                _line_code.push(<span className={classes.Normal}>{current_word} </span>)
            }
            if (_jsx_elements.length === 0)
                jsx_started = false

        } else {
            if (current_word === "import" || current_word === "from" || current_word === "if" || current_word === "else" || current_word === "export" || current_word === "return")
                _line_code.push(<span className={classes.Type2}>{current_word}</span>)
            else if (current_word === "let" || current_word === "const" || current_word === "var" || current_word === "function")
                _line_code.push(<span className={classes.Variable}>{current_word}</span>)
            else if (current_word === "console")
                _line_code.push(<span className={classes.JsxCustom}>{current_word}</span>)
            else if (flag)
                _line_code.push(<span className={classes.Function}>{current_word} </span>)
            else
                _line_code.push(<span className={classes.Normal}>{current_word} </span>)
        }


    }




    for (let i = 0; i < _code.length; i++) {

        _character = _code.charAt(i)

        // CHECK FOR WHITE SPACE

        if (_character === " " || _character === ' ') {
            // ADD TO LINE INCLUDING THIS
            // FIRST CHECK THE WORD THINGS AND ADD TO LINE
            // CHECK COMMENT OR STRING THEN ADD
            if (string_started !== "" || comment_started) {
                _word += _character
            } else if (_prev_word === "=") {
                _line_code.push(<span className={classes.Normal}>&nbsp;</span>)
            }
            else {
                console.log(_prev_word)
                if (_word.trim() !== "") {
                    wordChecker(_word)
                    _prev_word = _word;
                }
                // Push a white space
                _line_code.push(<span className={classes.Normal}>&nbsp;</span>)
                _word = "";
            }

        } else if (_character !== '\n' && characterCheck(_character, i)) {
            _word += _character
            // CHECK WHETHER IT IS A SPECIAL WORD INSIDE A WORD
            otherWordChecker(_word)
        }





        if (_character === '\n' || i === _code.length - 1) {
            if (comment_started) {
                _line_code.push(<span className={classes.Comment}>{_word}</span>)
                _word = ""
            }
            if (_word.trim() !== "")
                wordChecker(_word)
            _line_code.push(<span className={classes.Normal}>&nbsp; </span>)
            code_data.push(<div className={classes.Normal}>{[..._line_code]}</div>)
            comment_started = false
            _line_code.length = 0
            _word = ""
        }

    }


    return code_data;
}

export default code;
