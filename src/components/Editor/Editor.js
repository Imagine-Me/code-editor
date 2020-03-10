import React, { useState } from 'react';
import classes from './Editor.module.css';
import Tab from './Tab/Tab';
import Body from './Body/Body';

const Editor = (props) => {

    const [whichTab, activeTab] = useState(0)

    const tab1 = "import React,{Component} from 'react';\n" +
        "class App extends Component{\n" +
        "   render(){\n" +
        "       let i = 0;\n" +
        "       return (\n" +
        "           <div>\n" +
        "               <h1>Hello world</h1>\n" +
        "           </div>\n" +
        "       )\n" +
        "   }\n" +
        "}\n" +
        "export default App;";
    const tab2 = "import React from 'react';\n" +
        "   const app = () => {\n" +
        "       return (\n" +
        "           <h1 className={}>Hello world</h1>\n" +
        "       )\n" +
        "   }\n" +
        "export default app;";
    const tab3 = `import React,{Component} from 'react';
    class App extends Component{
        render(){
            return(
                <h1>Hello world</h1>
            )
        }
    }`;
    let data = [tab1, tab2, tab3];

    //function to change active tab
    const changeTabHandler = (key) => {
        activeTab(key)
    }

    let tabLists = data.map((_, index) => {
        if (whichTab === index)
            return <Tab active key={index} number={index} tabClicked={changeTabHandler} />
        else
            return <Tab key={index} number={index} tabClicked={changeTabHandler} />
    })

    return (
        <div className={classes.Editor}>
            <div className={classes.TabList}>
                {tabLists}
            </div>
            <Body anim height data={data} tab={whichTab} code="js" />
        </div>
    );
}

export default Editor;