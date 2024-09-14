import React from "react";
import PropTypes from "prop-types";
import "./HpBarTest.scss";

const getHpColor = hpPercentage => {
  if (hpPercentage > 75) {
    return "#18E8A9";
  } else if (hpPercentage > 50) {
    return "#E7D127";
  } else {
    return "#E81818";
  }
};

const safeRunSvgAnimation = animationElement => {
  if (typeof animationElement.beginElement === "function") {
    animationElement.beginElement();
  }
};

class HpBar extends React.PureComponent {
  static propTypes = {
    animationDuration: PropTypes.number,
    className: PropTypes.string,
    lowHpThickness: PropTypes.number,
    lowHpThreshold: PropTypes.number,
    hpPercentage: PropTypes.number.isRequired,
    thickness: PropTypes.number
  };

  static defaultProps = {
    animationDuration: 1000,
    className: "",
    lowHpThickness: 1,
    lowHpThreshold: 25,
    hpPercentage: 100,
    thickness: 4
  };

  constructor(props) {
    super(props);

    this.state = {
      hp: props.hpPercentage,
      hpLost: 0,
      hpGained: 0,
      hpGainedPathLength: 1000,
      maxHpPathLength: 1000
    };
  }

  componentDidMount() {
    if (this.hpBarBackgroundElement) {
      this.setState({
        maxHpPathLength: this.hpBarBackgroundElement.getTotalLength()
      });
    }
  }

  componentDidUpdate(prevProps) {
    const oldHpPercentage = Math.min(Math.max(prevProps.hpPercentage, 0), 100);
    const newHpPercentage = Math.min(Math.max(this.props.hpPercentage, 0), 100);

    if (newHpPercentage < oldHpPercentage) {
      this.setState({
        hp: newHpPercentage,
        hpGained: 0,
        hpLost: oldHpPercentage - newHpPercentage
      });

      safeRunSvgAnimation(this.hpLostOpacityAnimationElement);
      safeRunSvgAnimation(this.hpLostMotionAnimationElement);

      if (this.hpGainedTimeout) {
        clearTimeout(this.hpGainedTimeout);
      }
    }

    if (newHpPercentage > oldHpPercentage) {
      const hpGained = newHpPercentage - oldHpPercentage;
      this.setState({
        hp: oldHpPercentage,
        hpGained: hpGained,
        hpGainedPathLength: (this.state.maxHpPathLength * hpGained) / 100,
        hpLost: 0
      });

      if (this.hpGainedTimeout) {
        clearTimeout(this.hpGainedTimeout);
      }

      this.hpGainedTimeout = setTimeout(() => {
        this.setState({
          hp: newHpPercentage,
          hpGained: 0
        });
      }, this.props.animationDuration);
    }
  }

  render() {
    const halfThickness = this.props.thickness / 2;

    return (
      <svg
        viewBox={`0 ${-halfThickness} 100 ${this.props.thickness}`}
        className={`hit-points-bar ${this.props.className}`}
        overflow="visible">
        <defs>
          <path id="hp-lost-animation-path" d={`M 0 0 L 0 ${this.props.thickness * 1.5}`} />
          <filter id="low-hp-glow">
            <feGaussianBlur in="StrokePaint" stdDeviation="0.5" />
          </filter>
        </defs>
        <line
          ref={el => (this.hpBarBackgroundElement = el)}
          className="hit-points-bar__background"
          strokeWidth={this.props.thickness}
          stroke="#696D7A"
          x1="0"
          y1="0"
          x2="100"
          y2="0"
        />
        {this.state.hp < this.props.lowHpThreshold && this.state.hp > 0 && (
          <rect
            className="hit-points-bar__bar"
            stroke="none"
            fill={getHpColor(0)}
            x={-this.props.lowHpThickness}
            y={-halfThickness - this.props.lowHpThickness}
            width={this.state.hp + this.props.lowHpThickness * 2}
            height={this.props.thickness + this.props.lowHpThickness * 2}
            filter="url(#low-hp-glow)">
            <animate attributeName="opacity" dur="2000ms" begin="0s" repeatCount="indefinite" values="0;1;0" />
          </rect>
        )}
        <line
          className="hit-points-bar__bar"
          strokeWidth={this.props.thickness}
          stroke={getHpColor(this.state.hp)}
          x1="0"
          y1="0"
          x2={this.state.hp}
          y2="0"
        />
        <line
          className="hit-points-bar__lost-hp"
          strokeWidth={this.props.thickness}
          stroke={getHpColor(0)}
          opacity="0"
          x1={this.state.hp}
          y1="0"
          x2={this.state.hp + this.state.hpLost}
          y2="0">
          <animate
            ref={el => (this.hpLostOpacityAnimationElement = el)}
            attributeName="opacity"
            from="1"
            to="0"
            dur={`${this.props.animationDuration}ms`}
            begin="indefinite"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.755, 0.05, 0.855, 0.06"
          />
          <animateMotion
            ref={el => (this.hpLostMotionAnimationElement = el)}
            dur={`${this.props.animationDuration}ms`}
            begin="indefinite"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.645, 0.045, 0.355, 1">
            <mpath xlinkHref="#hp-lost-animation-path" />
          </animateMotion>
        </line>
        <line
          className={`hit-points-bar__gained-hp ${this.state.hpGained > 0 ? "play" : ""}`}
          strokeWidth={this.props.thickness}
          stroke={getHpColor(100)}
          strokeDasharray={this.state.hpGainedPathLength}
          strokeDashoffset={this.state.hpGainedPathLength}
          x1={this.state.hp}
          y1="0"
          x2={this.state.hp + this.state.hpGained}
          y2="0"
        />
      </svg>
    );
  }
}

const clamp = (val, min, max) => Math.max(Math.min(val, max), min);

export class HpBarExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hp: 100,
      hpLoss: 10
    };
  }

  reduceHp = amount => {
    this.setState(prevState => ({
      hp: clamp(prevState.hp - amount, 0, 100)
    }));
  };

  handleResetHp = () => {
    this.setState(() => ({
      hp: 100
    }));
  };

  render() {
    return (
      <div className="example">
        <HpBar hpPercentage={this.state.hp} />
        <button className="button button--down" onClick={this.reduceHp.bind(this, 20)}>
          -20 HP
        </button>
        <button className="button button--down" onClick={this.reduceHp.bind(this, 10)}>
          -10 HP
        </button>
        <button className="button button--down" onClick={this.reduceHp.bind(this, 5)}>
          -5 HP
        </button>
        <button className="button button--reset" onClick={this.handleResetHp}>
          Reset Hp
        </button>
        <button className="button button--up" onClick={this.reduceHp.bind(this, -5)}>
          +5 HP
        </button>
        <button className="button button--up" onClick={this.reduceHp.bind(this, -10)}>
          +10 HP
        </button>
        <button className="button button--up" onClick={this.reduceHp.bind(this, -20)}>
          +20 HP
        </button>
      </div>
    );
  }
}
