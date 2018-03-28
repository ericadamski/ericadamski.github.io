import React, { Component } from "react";
import styled, { css } from "styled-components";

const colors = {
  blue: "#0fa3b1", // dae7ce
  green: "#dae7ce",
  black: "#1d1e18",
  white: "#d9e5d6", // d3e1e7
  red: "#da2c38",
  pink: "#f9e0dc"
};

const Background = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100vw;
  max-height: 100vh;
  background: url("${props => props.background}");
  background-position: center;
  background-size: ${props => props.size};
`;

const ImageWrapper = styled.div`
  box-sizing: border-box;
  border-radius: 100%;
  width: 14rem;
  height: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-top: 5rem;
`;

const Page = styled.section`
  box-sizing: content-box;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.black};

  opacity: ${props => (props.fade ? 0.8 : 1)};
`;

const Bar = styled.div`
  margin: 1rem;
  height: 2rem;
  width: 100vw;
  display: flex;
  align-items: center;

  @media (min-width: 800px) {
    box-sizing: border-box;
    padding: 1rem 5rem;
  }
`;

const MouseBar = styled(
  class extends React.Component {
    constructor() {
      super();

      this.state = { x: 0, y: 0 };
    }

    componentDidMount() {
      document.addEventListener("mousemove", event =>
        this.setState({ x: event.clientX, y: event.clientY })
      );
    }

    render() {
      return (
        <Bar className={this.props.className}>
          {this.state.x} ↭ {this.state.y}
        </Bar>
      );
    }
  }
)`
  text-align: left;
  font-size: 1rem;
  top: 0;
  visibility: hidden;

  &::before {
    content: "↬";
    font-size: 2rem;
    margin-right: 0.25rem;
  }

  @media (min-width: 800px) {
    visibility: visible;
  }
`;

const MadeByBar = styled(({ className }) => (
  <Bar className={className}>
    <p>
      {[
        "Made With ",
        <span key="heart" aria-label="heart" role="img">
          ❤️
        </span>,
        "  By  ",
        <SpecialLink key="madebyme" href="https://github.com/ericadamski">
          Eric
        </SpecialLink>
      ]}
    </p>
  </Bar>
))`
  bottom: 0;
  text-align: right;
  justify-content: center;
  font-size: 1rem;

  @media (min-width: 800px) {
    justify-content: flex-end;
  }
`;

const Picture = styled.img`
  max-width: 100%;
  width: 100%;
`;

const SocialName = styled.span`
  font-size: 1rem;
  visibility: hidden;
  position: absolute;
  top: 50%;
  ${props => props.position}: -${props =>
  React.Children.toArray(props.children)[0].length * 12}px;
  transform: translateY(-50%);
  transition: 0.05s ease;

  &::${props => (props.position === "left" ? "after" : "before")} {
    content: "${props => (props.position === "left" ? "↝" : "↜")}";
    font-size: 2rem;
    margin-${props => props.position}: 5px;
  }
`;

const Icon = styled.a`
  font-size: 2rem;
  margin: 0 2rem;
  transition-property: opacity;
  transition: 0.1s ease;
  text-decoration: none;
  color: ${colors.blue};

  &:hover {
    ${SocialName} {
      visibility: visible;
    }
  }
`;

const Twitter = Icon.extend.attrs({
  className: "ion-social-twitter-outline",
  children: [
    <SocialName key="icon" position="right">
      @zealigan
    </SocialName>
  ],
  href: "https://twitter.com/zealigan"
})`
  position: relative;
`;

const Github = Icon.extend.attrs({
  className: "ion-social-github",
  children: [
    <SocialName key="icon" position="left">
      @ericadamski
    </SocialName>
  ],
  href: "https://github.com/ericadamski"
})`
  position: relative;
`;

const Social = styled.div.attrs({
  children: [<Twitter key="twitter" />, <Github key="github" />]
})`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    & > * {
      opacity: 0;
    }

    & > ${Github}:hover {
      opacity: 1;
    }

    & > ${Twitter}:hover {
      opacity: 1;
    }
  }
`;

const Image = styled(({ className }) => (
  <ImageWrapper className={className}>
    <Picture src="https://user-images.githubusercontent.com/6516758/38046654-3463db3c-328e-11e8-8cd2-e37d6f92f099.jpg" />
  </ImageWrapper>
))``;

const Paragraph = styled.p`
  padding: 0;
  margin: 0 1rem;
  max-width: 25rem;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  font-weight: 200;

  &::before {
    content: "${props => `0${props.number}`.slice(-2)}";
    margin-right: 1rem;
    border-bottom: 1px solid black;
    display: inline-block;
    font-weight: bold;
    line-height: 1rem;
  }
`;

const funkyHover = css`
  text-shadow: 0 0 transparent;
  transition-property: color, text-shadow, border;
  transition: 0.2s;
  display: inline-block;
  border-bottom: 2px solid ${colors.red};

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    text-shadow: 0 5px ${colors.pink};
    border-bottom: 2px solid transparent;
  }
`;

const SpecialLink = styled.a`
  ${funkyHover};
  text-decoration: none;

  &:active,
  &:visited {
    color: ${colors.black};
  }
`;

const HoverUseful = styled(
  class extends Component {
    state = { ful: true };

    render() {
      return (
        <span
          className={this.props.className}
          onMouseEnter={() => this.setState({ ful: false })}
          onMouseLeave={() => this.setState({ ful: true })}
        >
          {this.props.children}
          {this.state.ful ? "ful" : "less"}
        </span>
      );
    }
  }
)`
  border-bottom: 2px solid ${colors.red};

  &:hover {
    cursor: none;
  }
`;

const Name = styled.h1.attrs({ children: "Eric Adamski" })`
  margin: 1.5rem 0;
  padding: 0;
  ${funkyHover};

  &:hover {
    cursor: none;
    text-shadow: 0 5px ${colors.green};
  }
`;

export default class extends Component {
  state = { background: null, size: false };

  render() {
    return (
      <Page fade={this.state.background !== null}>
        <MouseBar />
        <Background
          background={this.state.background}
          size={this.state.size ? this.state.size : undefined}
        />
        <Image />
        <Name
          onMouseEnter={() =>
            this.setState({
              background:
                "https://user-images.githubusercontent.com/6516758/37846336-bde54af6-2ea3-11e8-8401-2bab85e0a96d.png"
            })
          }
          onMouseLeave={() => this.setState({ background: null })}
        />
        {[
          [
            "My mission is to be a source of value whilst helping others discover  their purpose. I create and work hard to support acting with compassion, embracing curiosity and creating spaces for collaboration."
          ],
          [
            "I write extremely ",
            <HoverUseful key="useful">use</HoverUseful>,
            " open source software when I’m not with ",
            <SpecialLink
              key="family"
              onMouseEnter={() =>
                this.setState({
                  background:
                    "https://user-images.githubusercontent.com/6516758/37875588-7a3f9938-300f-11e8-9c08-105c6029797f.jpg",
                  size: "contain"
                })
              }
              onMouseLeave={() =>
                this.setState({ background: null, size: null })
              }
            >
              my family
            </SpecialLink>,
            ". You can find some of my work here: ",
            <SpecialLink key="atom" href="https://atom.io/users/ericadamski">
              atom packages
            </SpecialLink>,
            ", ",
            <SpecialLink
              key="vscode"
              href="https://marketplace.visualstudio.com/search?term=publisher%3A%22Eric%20Adamski%22&target=VSCode&category=All%20categories&sortBy=Relevance"
            >
              vs code extensions
            </SpecialLink>,
            ", ",
            <SpecialLink
              key="npm"
              href="https://www.npmjs.com/search?q=maintainer:ericadamski"
            >
              npm packages
            </SpecialLink>,
            ", and explorations into the fundamentals of my Self on ",
            <SpecialLink key="medium" href="https://medium.com/@ericadamski">
              Medium
            </SpecialLink>,
            "."
          ]
        ].map((c, i) => (
          <Paragraph
            fade={this.state.background !== null}
            key={i}
            number={i + 1}
          >
            {c}
          </Paragraph>
        ))}
        <Social />
        <MadeByBar />
      </Page>
    );
  }
}
