import React from "react";
import posed, { PoseGroup } from "react-pose";

const RouteContainer = posed.div({
  enter: { top: 0, opacity: 1, delay: 300 },
  exit: { top: 0, opacity: 0, transition: { duration: 200 } }
});

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props;

    return (
      <PoseGroup>
        <RouteContainer key={location.key}>{children}</RouteContainer>
      </PoseGroup>
    );
  }
}

export default Transition;
