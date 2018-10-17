import React, { Component } from "react";
import zupage from "zupage";
import { Container, Image } from "semantic-ui-react";
import MediaBody from "react-media-body";
import Slider from "react-slick";
import "./App.css";

class App extends Component {
  state = {
    body: "",
    creator: {},
    colorPalette: [],
    date: "",
    images: [],
    paragraphs: [],
    title: ""
  };

  async componentDidMount() {
    const postResponse = await zupage.getCurrentPost();

    const date = new Date(
      postResponse.published_time * 1000
    ).toLocaleDateString("en-US");

    this.setState({
      body: postResponse.body,
      creator: postResponse.creator,
      colorPalette: postResponse.page.color_palette,
      date: date,
      images: postResponse.images,
      title: postResponse.title,
      slideIndex: 0
    });
  }

  renderTop = () => {
    const { creator, date, images, title } = this.state;

    var settings = {
      autoplay: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let style = {};

    if (images.length === 0) {
      style = { height: "0px", padding: "15px", visibility: "hidden" };
    }

    return (
      <div className="Top" style={style}>
        <Slider className="Slider" {...settings}>
          {this.renderImages()}
        </Slider>
        <div className="Info-Large">
          <div className="Title">{title}</div>
          <div className="Creator">
            <Image
              className="Avatar"
              circular
              src={creator.profile_image_url}
              verticalAlign="middle"
            />
            <div className="Creator-Name">{creator.name}</div>
            <div className="Date">{date}</div>
          </div>
        </div>
      </div>
    );
  };

  renderImages = () => {
    const { images } = this.state;

    return images.map((image, i) => {
      return (
        <div key={i} className="Slider-Item">
          <Image src={image.url} fluid />
        </div>
      );
    });
  };

  render() {
    const { body, creator, date, images, title } = this.state;

    let style = {};

    if (images.length === 0) {
      style = { visibility: "visible", height: "auto" };
    }

    return (
      <div className="Template">
        {this.renderTop()}
        <Container text>
          <div className="Info-Small" style={style}>
            <div className="Title">{title}</div>
            <div className="Creator">
              <Image
                className="Avatar"
                circular
                src={creator.profile_image_url}
                verticalAlign="middle"
              />
              <div className="Creator-Name">{creator.name}</div>
              <div className="Date">{date}</div>
            </div>
          </div>
          <MediaBody className="Body-Text">{body}</MediaBody>
        </Container>
      </div>
    );
  }
}

export default App;
