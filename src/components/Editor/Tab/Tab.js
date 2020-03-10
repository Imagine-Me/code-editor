import React from 'react';
import classes from './Tab.module.css';
import TabIcon from '../../../../Assets/js.svg'

const tab = (props) => {
    let classNames = [classes.Tab]
    if (props.active)
        classNames.push(classes.active)
    return (
        <div className={classNames.join(' ')} onClick={()=>props.tabClicked(props.number)}>
            <div className={classes.LeftSide}>
                <img className={classes.Image} src={TabIcon} alt="js" />
                <div className={classes.TabName}>React.js</div>
            </div>
            <div className={classes.Close} >&times;</div>
        </div>
    );
}

export default tab;