
export default {
  'GET /api/menu': function (req, res) {
    const menuData = [
      {
        id: '1',
        name: '首页',
        parentId: '0',
        granted: 'true',
        url: '/app',
      },
      {
        id: '2',
        name: '权限管理',
        parentId: '0',
        granted: 'true',
        children: [
          {
            id: '3',
            name: '角色管理',
            parentId: '2',
            granted: 'true',
            url: '/app/role',
          },
          {
            id: '4',
            name: '用户管理',
            parentId: '2',
            granted: 'true',
            url: '/app/userRole',
          },
        ],
      },
    ];
    setTimeout(() => {
      res.json({      // 将请求json格式返回
        status: 'success',
        message: '查询成功',
        result: {
          dataList: menuData,
        },
      });
    }, 200);
  },
};
