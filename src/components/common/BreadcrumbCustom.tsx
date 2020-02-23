/*
 * @Desc: 面包屑导航
 * @Author: Harry.Hao
 * @Date: 2020-01-27 10:22:38
 * @Last Modified by: Harry.Hao
 * @Last Modified time: 2020-01-27 11:55:35
 */

import React, { useState } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { menus, IMenu } from 'router/AppConfig';
import { Breadcrumb } from 'antd';

// 遍历路径
function createBreadcrumbNameMap(menu: IMenu[]) {
  const bdMap: any = {};
  for (const item of menu) {
    bdMap[item.path] = item.breadcrumbName;
    if (item.children) Object.assign(bdMap, createBreadcrumbNameMap(item.children));
  }
  return bdMap;
}

function BreadcrumbCustom(props: RouteComponentProps) {
  const [breadcrumbNameMap]: any = useState(() => ({ '/app': 'Home', ...createBreadcrumbNameMap(menus.menus) }));

  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
}

export default withRouter(BreadcrumbCustom);
