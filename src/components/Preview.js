import React, { Component } from "react";

export default class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewData: false,
      error: false
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

    console.log(rest_url);

    fetch(rest_url)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);

        if (res.post_title) {
          this.setState({ previewData: res });
        } else if (res.code) {
          this.setState({ error: res });
        }
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
