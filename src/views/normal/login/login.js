import { mapMutations } from 'vuex';
import menuData from '@/mock/menuData/menu.js';
import menuTree from '@/mock/menuData/menuTree.json';
export default {
  data() {
    return {
      loginName: '',
      password: ''
    };
  },
  methods: {
    ...mapMutations(['set_permission_resources', 'setUserInfo']),
    login() {
      // 写死登陆
      // this.$storage.session.setObj(this.$common.storageKey.resources, menuData);
      // this.set_permission_resources(menuData);
      // this.$storage.cookie.set('tokenStr', '1109_9403ce015c944a0c9fe9160abe71a0d4');
      // this.getMenuData();

      // if (this.$route.query.redirect) {
      //   this.$router.push({ name: this.$route.query.redirect });
      // } else {
      //   this.$router.push({ path: '/index' });
      // }
      // return;

      if (!this.loginName) {
        this.$alert.toast('用户名不能为空');
        return;
      }

      if (!this.password) {
        this.$alert.toast('密码不能为空');
        return;
      }

      let model = { username: this.loginName, password: this.password };

      this.$api.login.loginVaild.send(model, { showLoading: true }).then(res => {
        if (res.code === '00') {
          this.$alert.toast('登陆成功', { autoHideTimeout: 2000 });
          // 获取菜单数据
          this.getMenuData();
          // 设置token
          this.$storage.cookie.set('tokenStr', res.data);
          // 设置个人信息
          this.setUserInfo(res.data.userInfo);
        } 
      });
    },
    async getMenuData() {
      let menu = {
        loginName: '',
        realName: '',
        menuTree: []
      };
      try {
        let res = await this.$api.source.menu.send();
        if (res.code === '00') {
          menu.menuTree = this.handleData(res.data);

          // 缓存菜单数据
          this.$storage.session.setObj(this.$common.storageKey.resources, menu);
          // 设置权限数据
          this.set_permission_resources(menu);

          if (this.$route.query.redirect) {
            this.$router.push({ name: this.$route.query.redirect });
          } else {
            this.$router.push({ name: 'adminSys' });
          }
        } 
      } catch (error) {
        this.$alert.error(error.message);
      }
    },
    handleData(data) {
      let ret = [];
      if (!data) return;
      data.forEach(element => {
        let item = {
          id: element.id,
          parentId: '',
          resourceName: element.text,
          resourceCode: element.classPath,
          resourceType: element.type,
          resourceIcon: '',
          leaf: element.leaf,
          children: this.handleData(element.children)
        };
        ret.push(item);
      });
      return ret;
    }
  }
};
