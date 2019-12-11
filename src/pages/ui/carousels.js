import React from 'react';
import { Carousel, Card } from 'antd';

export default class carousels extends React.Component {

  render() {

    return (
      <div>
        <Card>
          <Carousel autoplay effect="fade">
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}