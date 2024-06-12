import { sendEvent } from "./Socket.js";
import stages from './assets/stage.json' with { type: 'json' };

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  nowstageId = 1000;
  nowstage = 0;
  stageChange = true;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001;

    let scoreUp = stages.data[this.nowstage + 1].score;
    // 점수가 해당하는 점수 이상일 시
    if (scoreUp <= this.score && this.stageChange) {
      this.stageChange = false;
      sendEvent(11, { currentStage: stages.data[this.nowstage].id, targetStage: stages.data[this.nowstage + 1].id });
      this.nowstage++;
      console.log("successful change map");
      this.stageChange = true;
    }
  }

  getItem(itemId) {
    switch(itemId)
    {
      case 1:
        this.score += 10;
        break;
      case 2:
        this.score += 20;
        break;
      case 3:
        this.score += 30;
        break;
      case 4:
        this.score += 40;
        break;
      case 5:
        this.score += 50;
        break;
      case 6:
        this.score += 60;
        break;
      default:
        this.score += 0;
        break;
    }
  }

  reset() {
    this.score = 0;
    this.nowstage = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
