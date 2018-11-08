import React, { Component } from "react";

export default class PreviewProvider extends Component {
  render() {
    let previewData = {
      ID: 110,
      post_author: "1",
      post_date: "2018-11-08 05:37:34",
      post_date_gmt: "2018-11-08 05:37:34",
      post_content: "jfkdlajfdklsajfksd",
      post_title: "preview",
      post_excerpt: "",
      post_status: "inherit",
      comment_status: "closed",
      ping_status: "closed",
      post_password: "",
      post_name: "26-autosave-v1",
      to_ping: "",
      pinged: "",
      post_modified: "2018-11-08 05:37:34",
      post_modified_gmt: "2018-11-08 05:37:34",
      post_content_filtered: "",
      post_parent: 26,
      guid: "http://gatsbywp.code/2018/11/08/26-autosave-v1/",
      menu_order: 0,
      post_type: "page",
      post_mime_type: "",
      comment_count: "0",
      filter: "raw",
      pathname: "/2018/11/08/26-autosave-v1/",
      permalink: "http://gatsbywp.code/2018/11/08/26-autosave-v1/",
      featured_img: null,
      template_slug: "default/page",
      acf: {
        team_title: null,
        image_field: null,
        repeater: null
      },
      acf_template: "test"
    };

    previewData = false;
    const {
      props: { children }
    } = this;

    if (previewData) {
      const childWithPreview = React.Children.map(children, child => {
        return React.cloneElement(child, {
          data: { wordpressWpCollections: previewData }
        });
      });

      return childWithPreview;
    } else {
      return children;
    }
  }
}
