import React, { Component } from "react";
import Solution from "../../components/solutions/solutions.js";
import styled from "styled-components";
import OutsideNavbar from "../../components/navbar/outsideNavbar.js";
import Footer from "../../components/footer/Footer.component.js";

class SolutionsPage extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: true
    }
  }
  
  componentDidMount(){
    setTimeout(() => {
    this.setState({loading: false})
    }, 2000);
  }
  render() {
    if (this.state.loading){
      return  <div className="loadingGif">
                <svg xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="25%" height="60px" viewBox="5.5 13 89 14"><defs><filter id="ldBar-5d1975c4de22-filter" x="-1" y="-1" width="3" height="3"><feMorphology operator="dilate" radius="3"></feMorphology><feColorMatrix values="0 0 0 0 1    0 0 0 0 1    0 0 0 0 1    0 0 0 1 0" result="cm"></feColorMatrix></filter><mask id="ldBar-5d1975c4de22-mask"><image xlinkHref="" filter="url(#ldBar-5d1975c4de22-filter)" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid"></image></mask><g><mask id="ldBar-5d1975c4de22-mask-path"><path d="M10 20Q20 15 30 20Q40 25 50 20Q60 15 70 20Q80 25 90 20" fill="#fff" stroke="#fff" filter="url(#ldBar-5d1975c4de22-filter)"></path></mask></g><clipPath id="ldBar-5d1975c4de22-clip"><rect class="mask" fill="#000"></rect></clipPath><pattern id="ldBar-5d1975c4de22-pattern" patternUnits="userSpaceOnUse" x="0" y="0" width="150" height="150"><image x="0" y="0" width="150" height="150" xlinkHref="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KICAgICAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIwIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOWRmIi8+PHN0b3Agb2Zmc2V0PSI2LjI1JSIgc3RvcC1jb2xvcj0iIzlmZCIvPjxzdG9wIG9mZnNldD0iMTIuNSUiIHN0b3AtY29sb3I9IiNkZjkiLz48c3RvcCBvZmZzZXQ9IjE4Ljc1JSIgc3RvcC1jb2xvcj0iI2ZkOSIvPjxzdG9wIG9mZnNldD0iMjUlIiBzdG9wLWNvbG9yPSIjOWRmIi8+PHN0b3Agb2Zmc2V0PSIzMS4yNSUiIHN0b3AtY29sb3I9IiM5ZmQiLz48c3RvcCBvZmZzZXQ9IjM3LjUlIiBzdG9wLWNvbG9yPSIjZGY5Ii8+PHN0b3Agb2Zmc2V0PSI0My43NSUiIHN0b3AtY29sb3I9IiNmZDkiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzlkZiIvPjxzdG9wIG9mZnNldD0iNTYuMjUlIiBzdG9wLWNvbG9yPSIjOWZkIi8+PHN0b3Agb2Zmc2V0PSI2Mi41JSIgc3RvcC1jb2xvcj0iI2RmOSIvPjxzdG9wIG9mZnNldD0iNjguNzUlIiBzdG9wLWNvbG9yPSIjZmQ5Ii8+PHN0b3Agb2Zmc2V0PSI3NSUiIHN0b3AtY29sb3I9IiM5ZGYiLz48c3RvcCBvZmZzZXQ9IjgxLjI1JSIgc3RvcC1jb2xvcj0iIzlmZCIvPjxzdG9wIG9mZnNldD0iODcuNSUiIHN0b3AtY29sb3I9IiNkZjkiLz48c3RvcCBvZmZzZXQ9IjkzLjc1JSIgc3RvcC1jb2xvcj0iI2ZkOSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzlkZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgo8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNncmFkaWVudCkiPgo8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iLTEwMCwtMCIKdG89IjAsMCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L3JlY3Q+PC9zdmc+"></image></pattern></defs><g><path d="M10 20Q20 15 30 20Q40 25 50 20Q60 15 70 20Q80 25 90 20" fill="none" class="baseline" stroke="#ddd" stroke-width="0.5"></path></g><g><path d="M10 20Q20 15 30 20Q40 25 50 20Q60 15 70 20Q80 25 90 20" class="mainline" clip-path="" fill="none" stroke-width="3" stroke="url(#ldBar-5d1975c4de22-pattern)" stroke-dasharray="41.60917663574219 42.60917663574219"></path></g></svg>
              </div>
    }
    return (
      <Container>
        <OutsideNavbar />
        <Solution />
        <Footer />
      </Container>
    );
  }
}

const Container = styled.div`
  background: #fcfcfb;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

export default SolutionsPage;
