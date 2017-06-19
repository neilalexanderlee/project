import qs from 'qs';
import mockjs from 'mockjs';  // 导入mock.js的模块

const { Random } = mockjs;  // 导入mock.js的随机数

// 数据持久化   保存在global的全局变量中
let userRoleData = {};

if (!global.userRoleData) {
  const data = mockjs.mock({
    'data|100': [{
      'id|+1': 1,
      role: () => {
        return Random.cname();
      },
      remark: () => {
        return Random.cparagraph();
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
  userRoleData = data;
  global.userRoleData = userRoleData;
} else {
  userRoleData = global.userRoleData;
}

export default {
  // post请求  /api/users/ 是拦截的地址   方法内部接受 request response对象
  'GET /api/userRole': function (req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;

    const data = userRoleData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const newPage = {
      current: currentPage * 1,
      total: userRoleData.page.total,
    };

    setTimeout(() => {
      res.json({      // 将请求json格式返回
        status: 'success',
        message: '查询成功',
        result: {
          dataList: data,
          page: newPage,
        },
      });
    }, 200);
  },
};
