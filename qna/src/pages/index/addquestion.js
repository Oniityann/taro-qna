import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Textarea, Button } from '@tarojs/components';
import Dialog from './dialog';
import './addquestion.less';

export default class AddQuestion extends Component {
  onCancelClick() {
    // 需要调用上层组件的方法
    this.props.onCancelQuestion && this.props.onCancelQuestion();
  }

  onCertainClick() {
    // 点击确定采集数据并传递
    if (this.state.title && this.state.desc) {
      // 调用父层传递数据
      this.props.onReceiveQuestion && this.props.onReceiveQuestion(this.state);
    } else {
      Taro.showToast({
        title: '请输入标题或描述',
        icon: 'none'
      });
    }
  }

  changeTitle(event) {
    this.setState({ title: event.target.value });
  }

  changeDesc(event) {
    this.setState({
      desc: event.target.value
    });
  }

  render() {
    return (
      <Dialog>
        <View className='add-question'>
          <View className='question-body'>
            <Input
              className='question-title'
              placeholder='请输入问题标题'
              focus
              onInput={this.changeTitle.bind(this)}
            />
            <Textarea
              className='question-desc'
              placeholder='请输入问题描述'
              onInput={this.changeDesc.bind(this)}
            />
            <View className='button-group'>
              <Button
                className='button cancel'
                onClick={this.onCancelClick.bind(this)}
              >
                取消
              </Button>
              <Button
                className='button certain'
                onClick={this.onCertainClick.bind(this)}
              >
                确定
              </Button>
            </View>
          </View>
        </View>
      </Dialog>
    );
  }
}
