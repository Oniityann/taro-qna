import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import './index.less';
import AddQuestion from './addquestion';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  state = {
    shouldShowQuestion: false,
    questionList: []
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  addQuestion() {
    this.setState({ shouldShowQuestion: true });
  }

  cancelQuestion() {
    this.setState({ shouldShowQuestion: false });
  }

  receiveQuestion(options) {
    let { questionList } = this.state;
    questionList.push(options);
    this.setState({ questionList: questionList }, () => {
      console.log(this.state.questionList);
    });
    this.cancelQuestion();
  }

  render() {
    return (
      <View className='index'>
        <View className='title'>Taro Question & Answers</View>
        {this.state.shouldShowQuestion ? (
          <AddQuestion
            onCancelQuestion={this.cancelQuestion.bind(this)}
            onReceiveQuestion={this.receiveQuestion.bind(this)}
          />
        ) : null}
        <Button
          className='question-button'
          onClick={this.addQuestion.bind(this)}
        >
          Ask
        </Button>
      </View>
    );
  }
}
