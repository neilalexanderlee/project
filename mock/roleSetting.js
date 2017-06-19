import mockjs from 'mockjs';  // 导入mock.js的模块

const { Random } = mockjs;  // 导入mock.js的随机数

// 数据持久化   保存在global的全局变量中
let roleData = {};

if (!global.roleData) {
  const data = mockjs.mock({
    'data|100': [{
      'id|+1': 1,
      role: () => {
        return Random.cname();
      },
      remark: () => {
        return Random.csentence(20);
      },
      createTime: () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
    }],
    page: {
      total: 100,
      current: 1,
    },
  });
  roleData = data;
  global.roleData = roleData;
} else {
  roleData = global.roleData;
}

export default {
  // post请求  /api/users/ 是拦截的地址   方法内部接受 request response对象
  'GET /api/role': function (req, res) {
    setTimeout(() => {
      res.json({      // 将请求json格式返回
        status: 'success',
        message: '查询成功',
        result: {
          dataList: roleData.data,
        },
      });
    }, 200);
  },
  'GET /api/roleResources': function (req, res) {
    const treeData = [
      {
        id: 1,
        name: '首页',
        parentId: 0,
        granted: true,
      },
      {
        id: 2,
        name: '权限管理',
        parentId: 0,
        granted: true,
        children: [
          {
            id: 3,
            name: '角色管理',
            parentId: 2,
            granted: false,
          },
        ],
      },
    ];
    setTimeout(() => {
      res.json({      // 将请求json格式返回
        status: 'success',
        message: '查询成功',
        result: {
          dataList: treeData,
        },
      });
    }, 200);
  },
  'POST /api/updateRole': function (req, res) {
    console.log('请求后台参数为', req.body);
    setTimeout(() => {
      res.json({      // 将请求json格式返回
        status: 'success',
        message: '更新成功',
      });
    }, 200);
  },
};
