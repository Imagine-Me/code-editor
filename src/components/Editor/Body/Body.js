import React, { Component } from 'react';
import classes from './Body.module.css';
import CodeJs from '../Code/CodeJs';

class Body extends Component {
    state = {
        data: "",
        tab: this.props.tab
    }

    componentDidMount() {
        let i = 0;
        if (this.props.anim)
            this.interval = setInterval(() => {
                this.animation(this.props.data[this.props.tab], i);
                i++;
            }, 50)
        else
            this.setState({ data: this.props.data[this.props.tab] })
    }
    componentDidUpdate(prevState, nextState, snapshot) {
        // this.animator()
        if (prevState.tab !== this.props.tab && this.props.anim) {
            let i = 0;
            clearInterval(this.interval)
            this.setState({ data: "" })
            this.interval = setInterval(() => {
                this.animation(this.props.data[this.props.tab], i)
                i++;
            }, 50)
        } else if (prevState.tab !== this.props.tab || prevState.data !== this.props.data) {
            this.setState({ data: this.props.data[this.props.tab] })
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }
    animation = (data, i) => {
        this.setState({ data: this.state.data + data.charAt(i) })
        i++;
        if (i >= this.props.data[this.props.tab].length)
            clearInterval(this.interval)
    }

    render() {
        let classNames = [classes.Body];
        if (this.props.height)
            classNames.push(classes.Height)
        if (this.props.border)
            classNames.push(classes.BorderRadius)
        if (this.state.data !== undefined) {
            const lines = (this.state.data.match(/\n/g) || '').length + 1;
            //Number loading
            let number = []
            for (let i = 1; i < lines + 1; i++) {
                number.push(<div key={i}>{i}</div>);
            }

            let code = null;
            if (this.props.code === "js")
                code = <CodeJs data={this.state.data} />

            return (
                <div className={classNames.join(' ')}>
                    <div className={classes.Numbers}>
                        {number}
                    </div>
                    <div className={classes.Code}>
                        {code}
                    </div>
                </div>
            );
        }else{
            return null
        }
    }
}

export default Body;