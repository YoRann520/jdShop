module.exports = {
    // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    open: false,
    hotOnly: false,
    proxy: null, // 设置代理
    // node 可以用来写虚拟接口数据
    before: app => {
        // 登陆数据
        const userInfo = [
            {
                username: 'yooran520',
                tel: '15024039394',
                email: '1445640587@qq.com',
                password: 'yooran520',
                vcode: '123456'
            }
        ]
        // 携带token给前端
        const tokenKey = `${userInfo[0].username}`;
        // 验证码登陆
        app.get('/api/shortMsgLogin/vcode',(req,res) => {
            const tel = req.query.tel;
            if (tel) {
                res.json({
                    code: 2,
                    tel: tel,
                    vcode: '123456',
                    msg: '发送成功'
                })
            } else {
                res.json({
                    code: -2,
                    msg: '手机号码不能为空！'
                })
            }
        })
        // 登陆接口
        app.get('/api/shortMsgLogin',(req,res) => {
            const { tel,vcode } = req.query;
            if (tel && vcode == '123456') {
                res.json({
                    code: 11,
                    msg: '登陆成功！',
                    token: tokenKey+'-'+ tel + '-'+ (new Date().getTime()*60*60*1000)
                })
            } else {
                if (vcode == '') {
                    res.json({
                        code: -12,
                        msg: '验证码不能为空！'
                    })
                } else if (vcode !== '123456') {
                    res.json({
                        code: -13,
                        msg: '验证码不正确！'
                    })
                }
            }
        })
        // 账号登陆
        app.get('/api/aCountLogin',(req,res) => {
            const { username,password } = req.query
            if (username == userInfo[0].username || username == userInfo[0].tel || username == userInfo[0].email) {
                if (password == userInfo[0].password) {
                    res.json({
                        code: 200,
                        username: username,
                        password: password,
                        msg: '登陆成功',
                        token: tokenKey+'-'+ username + '-'+ (new Date().getTime()*60*60*1000)
                    })
                } else {
                    res.json({
                        code: 300,
                        msg: '密码错误'
                    })
                }
            } else {
                res.json({
                    code: 400,
                    msg: '用户名不存在！'
                })
            }
        })
        // 分类左侧菜单
        app.get('/api/Classification/menu', (req,res) => {
            res.json([
                {
                    title: '热门推荐',
                    active: true
                },
                {
                    title: '手机数码',
                    active: false
                },
                {
                    title: '家用电器',
                    active: false
                },
                {
                    title: '电脑办公',
                    active: false
                },
                {
                    title: '计生情趣',
                    active: false
                },
                {
                    title: '美妆护肤',
                    active: false
                },
                {
                    title: '个护清洁',
                    active: false
                },
                {
                    title: '汽车生活',
                    active: false
                },
                {
                    title: '京东超市',
                    active: false
                },
                {
                    title: '男装',
                    active: false
                },
                {
                    title: '男鞋',
                    active: false
                },
                {
                    title: '女装',
                    active: false
                },
                {
                    title: '女鞋',
                    active: false
                },
                {
                    title: '母婴童装',
                    active: false
                },
                {
                    title: '图书音像',
                    active: false
                },
                {
                    title: '运动户外',
                    active: false
                },
                {
                    title: '内衣配饰',
                    active: false
                },
                {
                    title: '食品生鲜',
                    active: false
                },
                {
                    title: '酒水饮料',
                    active: false
                },
                {
                    title: '家具家装',
                    active: false
                },
                {
                    title: '家居厨具',
                    active: false
                }
            ])
        })
        // 商品分类
        app.get('/api/Classification/type', (req,res) => {
            const type = req.query.type
            const typeData1 = require('./static/productType01.json')
            const typeData2 = require('./static/productType02.json')
            switch (type) {
                case '0':
                    res.json(typeData1)
                break;
                case '1':
                res.json(typeData2)
                break
            } 
        })

    }
  }
}