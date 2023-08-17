import React, {Component} from 'react';
import {PageContainer} from "@ant-design/pro-components";
import {Button, Card, Col, Row, Input, notification} from "antd";
import {
  Player,
  ControlBar,
  PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
  ReplayControl, // 后退按钮
  ForwardControl,  // 前进按钮
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,  // 倍速播放选项
  VolumeMenuButton,
  BigPlayButton
} from 'video-react';
import "video-react/dist/video-react.css"; // import css

const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm'
};

export default class PlayerControlExample extends Component {
  constructor(props, context) {
    super(props, context);

    // this.state = {
    //     source: sources.bunnyMovie
    // };


    this.state = {
      playerSource: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
      inputVideoUrl: ''
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.updatePlayerInfo = this.updatePlayerInfo.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }


  componentDidUpdate(prevProps, prevState) {
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    if (this.state.playerSource !== prevState.playerSource) {
      this.player.load();
    }
  }

  handleValueChange(e) {
    const {value} = e.target;
    this.setState({
      inputVideoUrl: value
    });
  }

  updatePlayerInfo() {
    const {inputVideoUrl} = this.state;
    console.log(inputVideoUrl)
    this.setState({
      playerSource: inputVideoUrl
    });
  }

  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  load() {
    this.player.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const {player} = this.player.getState();
      this.player.seek(player.currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.player.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const {player} = this.player.getState();
      this.player.playbackRate = player.playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const {player} = this.player.getState();
      this.player.volume = player.volume + steps;
    };
  }

  changeSource(name) {
    return () => {
      this.setState({
        source: sources[name]
      });
      this.player.load();
    };
  }

  render() {
    return (
      <PageContainer title="播放器" breadcrumb={null}>
        <Card>
          <Row>
            <Col span={24} style={{justifyContent: 'center',display: 'flex'}}>
              <Player
                ref={player => {
                  this.player = player;
                }}
                autoPlay
                // playsInline='true'
                // src="https://videomaker-resources.ivh.qq.com/broadcast/Basic/video/e1d1ab25-c673-47cd-a9b1-29223a3298d8.webm"
                // poster="https://video-react.js.org/assets/poster.png"
                fluid={false}
                width={900}
                height={510}
              >
                <BigPlayButton position="center"/>
                <source src={this.state.playerSource}/>
                <ControlBar autoHide={false}>
                  <VolumeMenuButton vertical/>
                  <ReplayControl seconds={10} order={1.1}/>
                  <ForwardControl seconds={10} order={1.1}/>
                  <PlayToggle/>
                  <CurrentTimeDisplay order={4.1}/>
                  <TimeDivider order={4.2}/>
                  <PlaybackRateMenuButton rates={[5, 2, 1.5, 1.25, 1, 0.5]} order={7.1}/>
                </ControlBar>
              </Player>
            </Col>
            {/*<Col span={9} style={{textAlign: 'center', fontSize: 20}}>*/}
            {/*  {JSON.stringify(this.state.player, null, 2)}*/}
            {/*</Col>*/}
          </Row>
        </Card>
        <Card style={{marginTop: 8}}>
          <Row>
            <div>Video or Audio Url</div>
            <Input size='large' placeholder="请输入要请求的url" style={{marginTop: 10}}
                   value={this.state.inputVideoUrl}
                   onChange={this.handleValueChange}
            />
          </Row>
          <Row style={{marginTop: 10,justifyContent: 'center'}}>
            <Button onClick={this.updatePlayerInfo} type="primary" size='large'
                    style={{marginRight: 30, width: 120}}>Update</Button>
            <Button onClick={this.play} type="primary" size='large' style={{marginRight: 30, width: 120}}>play</Button>
            <Button onClick={this.pause} type="primary" size='large'
                    style={{marginRight: 30, width: 120}}>pause</Button>
            <Button onClick={this.load} type="primary" size='large' style={{marginRight: 30, width: 120}}>load</Button>

            <Button onClick={this.setMuted(true)} type="primary" size='large'
                    style={{marginRight: 30, width: 120}}>muted=true</Button>
            <Button onClick={this.setMuted(false)} type="primary" size='large'
                    style={{marginRight: 30, width: 120}}>muted=false</Button>
          </Row>
        </Card>
      </PageContainer>
    )
  }
}
