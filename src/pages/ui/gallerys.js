import React from 'react';
import { Card, Row, Col, Modal } from 'antd';

export default class gallerys extends React.Component {
  state = {
    imgSrc: [
      ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png',],
      ['7.png', '8.png', '9.png', '10.png', '24.png', '25.png', '23.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png', '22.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png', '21.png']
    ],
    activeImg: null
  }

  openImgModal = (img) => {
    this.setState({
      activeImg: '/gallery/' + img
    })
  }

  handleCloseModal = () => {
    this.setState({
      activeImg: null
    })
  }

  render() {
    const imgSrc = this.state.imgSrc;
    const imgList = imgSrc.map(items =>
      items.map(item =>
        <Card
          key={item}
          cover={<img src={'/gallery/' + item} alt="GALLERY" />}
          style={{ marginBottom: 10 }}
          onClick={() => this.openImgModal(item)}
        >
          <Card.Meta
            title="title"
            description="description"
          />
        </Card>
      )
    )
    return (
      <div className="wrap-gallery">
        <Row gutter={10}>
          {
            imgList.map((item, index) =>
              <Col md={6} key={index}>
                {item}
              </Col>
            )
          }
        </Row>

        <Modal
          width={300}
          max-height={500}
          title="图片预览"
          visible={this.state.activeImg ? true : false}
          footer={null}
          onCancel={this.handleCloseModal}
        >
          <img src={this.state.activeImg} alt="" style={{width: '100%'}} />
        </Modal>
      </div>
    );
  }
}