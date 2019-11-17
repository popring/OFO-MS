import React from 'react';
import { Card } from "antd";
import './detail.less';

class detail extends React.Component {

  state = {
    orderInfo: {}
  }

  componentDidMount() {
    const orderId = this.props.match.params.orderId;
    this.getDetailInfo(orderId);
  }

  getDetailInfo = (orderId) => {
    this.axios.get('/order/detail', {
      params: {
        order_id: orderId
      }
    }).then(res => {
      this.setState({
        orderInfo: res.result
      });
      this.renderMap(res.result);
    });
  }

  renderMap = (data) => {
    this.map = new window.BMap.Map('orderDetailMap');

    // 添加地图控件
    this.addMapControl();
    // 路线图绘制方法
    this.drawBikeRoute(data.position_list);
    // 服务区绘制
    this.drwaServiceArea(data.area);
  }

  // 添加地图控件
  addMapControl = () => {
    const map = this.map;
    map.addControl(new window.BMap.ScaleControl({
      anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT
    }));
    map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    map.enableScrollWheelZoom();
  }

  // 路线图绘制方法
  drawBikeRoute = (positionList) => {
    const map = this.map;
    let startPoint, endPoint;
    if (positionList.length <= 0) {
      return;
    }

    // 起点
    let first = positionList[0];
    startPoint = new window.BMap.Point(first.lon, first.lat);
    let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(36, 42)
    })
    let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
    map.addOverlay(startMarker);

    // 终点
    let end = positionList[positionList.length - 1];
    endPoint = new window.BMap.Point(end.lon, end.lat);
    let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(36, 42)
    })
    let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
    map.addOverlay(endMarker);

    this.map.centerAndZoom(endPoint, 11);

    // 路径连线
    const trackPoint = positionList.map((item) => {
      return new window.BMap.Point(item.lon, item.lat);
    });
    const polyline = new window.BMap.Polyline(trackPoint, {
      strokeColor: "#1869AD",
      strokeWeight: 3,
      strokeOpacity: 1
    });
    map.addOverlay(polyline);
  }

  // 服务区绘制方法
  drwaServiceArea = (positionList) => {
    // 路径连线
    const trackPoint = positionList.map((item) => {
      return new window.BMap.Point(item.lon, item.lat);
    });
    const Polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: "#1869AD",
      strokeWeight: 3,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: 0.3
    });
    this.map.addOverlay(Polygon);
  }

  render() {
    const orderInfo = this.state.orderInfo;
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map" onWheel={this.changeZoom}></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{orderInfo.mode === 1 ? '停车点' : '服务区'}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{orderInfo.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{orderInfo.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{orderInfo.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{orderInfo.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行驶起点</div>
                <div className="detail-form-content">{orderInfo.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶终点</div>
                <div className="detail-form-content">{orderInfo.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">{orderInfo.distance / 1000}公里</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}

export default detail;