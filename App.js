import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class App extends Component {

    constructor(){
        super();
        this.state = {
            resultText: '',
            calculationText: ''
        };
        this.operations = ['Del','+','-','*','/'];
    }

    calculateResult(){
        const text = this.state.calculationText;
        this.setState({
            resultText: eval(text)
        });
    }

    validate(){
        const text = this.state.calculationText;
        switch (text.slice(-1)){
            case '+':
            case '-':
            case '/':
            case '*':
                return false;
        }
        return true;
    }

    btnPressed(text){
        switch (text){
            case '=':
                return this.validate() && this.calculateResult();
            case 'Del':
                let calculationText = this.state.calculationText.split('');
                calculationText.pop();
                this.setState({
                    calculationText: calculationText.join('')
                });
                break;
            case '+':
            case '-':
            case '/':
            case '*':
                const last = this.state.calculationText.split('').pop();
                if (this.operations.indexOf(last)>0) return;
                this.setState({
                    calculationText: this.state.calculationText + text
                });
                break;
            default:
                this.setState({
                    calculationText: this.state.calculationText + text
                })
        }
    }

    render() {
        let numberRows = [];
        let numbers = [[7,8,9],[4,5,6],[1,2,3],[0,'.','=']];
        for (let i = 0;i<4;i++){
            let row = [];
            for (let j = 0;j<3;j++){
                row.push(
                    <TouchableOpacity
                        key={numbers[i][j]}
                        onPress={()=>this.btnPressed(numbers[i][j])}
                        style={styles.button}
                    >
                        <Text style={styles.btnText}>{numbers[i][j]}</Text>
                    </TouchableOpacity>
                )
            }
            numberRows.push(
                <View key={i} style={styles.row}>{row}</View>
            )
        }

        let ops = [];
        for(let i = 0; i < 5; i++){
            ops.push(
                <TouchableOpacity
                    key={this.operations[i]}//
                    style={styles.button}
                    onPress={()=>this.btnPressed(this.operations[i])}
                >
                    <Text style={[styles.btnText, styles.color_white]}>
                        {this.operations[i]}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.calculation}>
                    <Text style={styles.calculationText}>
                        {this.state.calculationText}
                    </Text>
                </View>
                <View style={styles.result}>
                    <Text style={styles.resultText}>
                        {this.state.resultText}
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {numberRows}
                    </View>
                    <View style={styles.operation}>
                        {ops}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    result:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    calculation:{
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    buttons:{
        flex: 6,
        flexDirection:'row'
    },
    numbers:{
        flex: 3,
        backgroundColor: '#434343'
    },
    operation:{
        flex: 1,
        backgroundColor: '#636363',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    row:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    resultText:{
        fontSize: 30,
        color: 'black'
    },
    color_white:{
        color: 'white'
    },
    calculationText:{
        fontSize: 24,
        color: 'black'
    },
    btnText:{
        fontSize: 40,
        color: 'white'
    }
});
