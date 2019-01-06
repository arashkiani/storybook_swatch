import React, { Component } from "react";
import addons, { makeDecorator } from "@storybook/addons";
import styled from "@emotion/styled";
import { Circle } from "react-color";

const Container = styled.div({
  margin: 10,
  width: "100%",
  overflow: "auto"
});

class Swatch extends Component {
  state = {
    colors: []
  };

  onAddData = ({ options }) => {
    this.setState({ colors: options });
  };

  componentDidMount() {
    const { channel } = this.props;
    channel.on("colors/add_colors", this.onAddData);
  }

  shouldComponentUpdate({ colors }, { colors: nextColors }) {
    return colors !== nextColors;
  }

  render() {
    const {
      props: { active },
      state: { colors }
    } = this;

    if (!active || !colors.length) {
      return null;
    }
    const props = { colors };
    return (
      <Container>
        <Circle {...props} />
      </Container>
    );
  }
}

export default Swatch;
export const withColors = makeDecorator({
  name: "withColors",
  parameterName: "colors",
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, data) => {
    const channel = addons.getChannel();
    channel.emit("colors/add_colors", data);
    return getStory(context);
  }
});
