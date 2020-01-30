/*
 * @Desc: 组件总出口
 * @Author: Harry.Hao
 * @Date: 2020-01-15 17:04:55
 * @Last Modified by: Harry.Hao
 * @Last Modified time: 2020-01-22 16:22:25
 */

import Demo from './demo';
import Login from './pages/Login';
import Home from './Home';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Loading from './ui/Loading';
import Message from './ui/Message';
import Notification from './ui/Notification';
import Carsouse from './ui/Carsouse';
import Tabs from './ui/Tabs';
import FormLogin from './Form/FormLogin';
import FormRegister from './Form/FormRegister';
import BasicTable from './Table/BasicTable';
import HeightTable from './Table/HeightTable';
import City from './City/index';
import Order from './Order/index';
import NoMatch from './common/404';

export default {
  Demo,
  Login,
  Home,
  Button,
  Modal,
  Loading,
  Message,
  Notification,
  Tabs,
  Carsouse,
  FormLogin,
  FormRegister,
  BasicTable,
  HeightTable,
  City,
  Order,
  NoMatch
} as any;
