import Taro, { Component, setStorage } from '@tarojs/taro';
import { View, Text, Button, Image } from '@tarojs/components';
import './index.less';
import AddQuestion from './addquestion';
import Right from '../img/right.png';
import Wrong from '../img/wrong.png';

function getStore(key) {
  let string = Taro.getStorageSync(key);
  if (!string) {
    return [];
  }
  return JSON.parse(string);
}

function setStore(key, obj) {
  let string = obj;
  if (typeof obj == 'object') {
    string = JSON.stringify(obj);
  }
  Taro.setStorageSync(key, string);
}

// 之前存入的数组没有 id，重新在这里构造一下，只运行一次
// let arr = getStore('questions').map(item => {
//   return { id: parseInt(Math.random() * 10000), ...item };
// });
// setStore('questions', arr);

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  state = {
    shouldShowQuestion: false,
    questionList: getStore('questions')
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
    questionList.push({ id: parseInt(Math.random() * 10000), ...options });
    this.setState({ questionList: questionList }, () => {
      console.log(this.state.questionList);
      setStore('questions', this.state.questionList);
    });
    this.cancelQuestion();
  }

  vote(item) {
    let { questionList } = this.state;
    if (item) {
      item.vote = item.vote ? item.vote + 1 : 1;
    }
    let newList = questionList.map(itemQuestion => {
      if (itemQuestion.id == item.id) {
        itemQuestion = { ...item };
      }
      return itemQuestion;
    });

    // setState 才会触发页面更新，只修改数组不会使页面更新
    this.setState({ questionList: newList }, () => {
      setStore('questions', this.state.questionList);
    });
  }

  reverseVote(item) {
    let { questionList } = this.state;
    if (item) {
      item.vote = item.vote ? (item.vote - 1 >= 0 ? item.vote - 1 : 0) : 0;
    }
    let newList = questionList.map(itemQuestion => {
      if (itemQuestion.id == item.id) {
        itemQuestion = { ...item };
      }
      return itemQuestion;
    });

    // setState 才会触发页面更新，只修改数组不会使页面更新
    this.setState({ questionList: newList }, () => {
      setStore('questions', this.state.questionList);
    });
  }

  render() {
    let { questionList } = this.state;
    let sortedList = questionList.sort((a, b) => a.vote < b.vote);
    return (
      <View className='index'>
        <View className='title'>Question & Answers</View>
        <View className='question-list'>
          {sortedList.map((item, index) => {
            return (
              <View className='question-cell' key={index}>
                <View className='question-text'>
                  <View className='question-title'>{item.title}</View>
                  <View className='question-desc'>{item.desc}</View>
                </View>

                <View className='question-vote'>
                  <Image
                    className='vote-img'
                    onClick={this.reverseVote.bind(this, item)}
                    src={Wrong}
                  />
                  <Text className='vote-count'>
                    {item.vote ? item.vote : 0}
                  </Text>
                  <Image
                    className='vote-img'
                    onClick={this.vote.bind(this, item)}
                    src={Right}
                  />
                </View>
              </View>
            );
          })}
        </View>
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
