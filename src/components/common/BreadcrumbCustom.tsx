/*
 * @Desc: 面包屑导航
 * @Author: Harry.Hao
 * @Date: 2020-01-27 10:22:38
 * @Last Modified by: Harry.Hao
 * @Last Modified time: 2020-01-27 11:55:35
 */

import React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { menus, IMenu } from 'router/AppConfig';
import { Breadcrumb } from 'antd';

const breadcrumbNameMap: any = {
  '/app': 'Home'
};

function breadMap(menu: IMenu[]): void {
  for (const item of menu) {
    breadcrumbNameMap[item.path] = item.breadcrumbName;
    if (item.children) breadMap(item.children);
  }
}

function BreadcrumbCustom(props: RouteComponentProps) {
  breadMap(menus.menus);
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = extraBreadcrumbItems;

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
}

export default withRouter(BreadcrumbCustom);
