import React, { Component } from "react";

export default class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewData: false
    };
  }
  componentDidMount() {
    const urlParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : false;

    if (!urlParams) return;

    const rest_base = urlParams.get("rest_base");
    const post_id = urlParams.get("preview");
    const nonce = urlParams.get("nonce");

    const rest_url = `/wp-json/wp/v2/${rest_base}/${post_id}/preview/?_wpnonce=${nonce}`;
    // const rest_url = `http://gatsbywpmamp.test/wp-json/wp/v2/${rest_base}/${post_id}/preview/`;

    console.log(rest_url);
    // if (!rest_base || !post_id || !nonce) return;

    // fetch(rest_url)
    //   .then(res => {
    //     // console.log(res.text());
    //     return res.text();
    //   })
    //   .then(res => {
    //     console.log(res);
    //     // this.setState({ previewData: res });
    //   });

    fetch(rest_url)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        this.setState({ previewData: res });
      });
  }
  render() {
    const {
      props: { children }
    } = this;

    if (this.state.previewData && typeof window !== "undefined") {
      const childrenWithPreview = React.Children.map(children, child => {
        return React.cloneElement(child, {
          data: { wordpressWpCollections: this.state.previewData }
        });
      });

      return childrenWithPreview;
    } else {
      return <h1>Loading</h1>;
    }
  }
}
