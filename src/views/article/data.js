export default '## 为什么要使用多级菜单？\n' +
'只是为了适应不同的业务需求，也许公司目前的项目中没有使用多级菜单，但我们应该要支持多级菜单。这里说的多级，意思是不确定有多少级，可能1级，可能3级，可能N级（N为自然数）。\n' +
'\n' +
'## 多级菜单的实现\n' +
'多级菜单的实现并不难，按照ElementUI官网的实例，结合组件递归即可实现\n' +
'\n' +
'`sidebar.vue`:\n' +
'```\n' +
'<template>\n' +
'  <el-collapse-transition>\n' +
'    <el-menu\n' +
'      background-color="#1d1e23"\n' +
'      text-color="#b5b5b5"\n' +
'      active-text-color="#fff"\n' +
'      :unique-opened="true"\n' +
'      :collapse="isCollapse"\n' +
'      :default-active="$route.path"\n' +
'      :style="{width: isCollapse ? \'\' : \'200px\'}"\n' +
'      router\n' +
'    >\n' +
'      <template v-for="menu in menus">\n' +
'        <el-menu-item\n' +
'          v-if="!menu.children"\n' +
'          :index="menu.path"\n' +
'          :key="menu.name"\n' +
'        >\n' +
'          <i\n' +
'            v-if="menu.icon"\n' +
'            :class="menu.icon"\n' +
'          />\n' +
'          <span slot="title">{{ menu.title }}</span>\n' +
'        </el-menu-item>\n' +
'\n' +
'        <menus\n' +
'          v-else\n' +
'          :key="menu.name"\n' +
'          :parent-menu="menu"\n' +
'        />\n' +
'      </template>\n' +
'      <div\n' +
'        class="collapse"\n' +
'        @click="isCollapse = !isCollapse"\n' +
'      >\n' +
'        <el-tooltip\n' +
'          class="item"\n' +
'          effect="dark"\n' +
'          content="收缩侧栏"\n' +
'          placement="right-end"\n' +
'        >\n' +
'          <i\n' +
'            class="el-icon-d-arrow-left"\n' +
'            v-show="!isCollapse"\n' +
'          />\n' +
'        </el-tooltip>\n' +
'        <el-tooltip\n' +
'          class="item"\n' +
'          effect="dark"\n' +
'          content="展开侧栏"\n' +
'          placement="right-end"\n' +
'        >\n' +
'          <i\n' +
'            class="el-icon-d-arrow-right"\n' +
'            v-show="isCollapse"\n' +
'          />\n' +
'        </el-tooltip>\n' +
'      </div>\n' +
'    </el-menu>\n' +
'  </el-collapse-transition>\n' +
'</template>\n' +
'\n' +
'<script>\n' +
'    import ElCollapseTransition from \'element-ui/lib/transitions/collapse-transition\';\n' +
'    import Menus from \'./menus\';\n' +
'\n' +
'    export default {\n' +
'        components: {ElCollapseTransition, Menus},\n' +
'        data() {\n' +
'            return {\n' +
'                menus: JSON.parse(sessionStorage.getItem(\'menus\')),\n' +
'                isCollapse: document.body.clientWidth < 910\n' +
'            };\n' +
'        },\n' +
'        watch: {\n' +
'            \'$store.state.smallScreen\': function () {\n' +
'                this.isCollapse = this.$store.getters.getSmallScreen;\n' +
'            }\n' +
'        }\n' +
'    };\n' +
'</script>\n' +
'\n' +
'<style scoped lang="scss">\n' +
'  .el-menu {\n' +
'    min-height: calc(100vh - 60px);\n' +
'\n' +
'    .collapse {\n' +
'      cursor: pointer;\n' +
'      text-align: center;\n' +
'      border-top: 1px solid #101117;\n' +
'      border-bottom: 1px solid #101117;\n' +
'      line-height: 30px;\n' +
'\n' +
'      i {\n' +
'        color: #ccc;\n' +
'        font-size: 12px;\n' +
'      }\n' +
'    }\n' +
'  }\n' +
'</style>\n' +
'```\n' +
'\n' +
'其中自定义了一个组件`menus.vue`，之所以单独抽出一个组件，就是为了组件递归，以实现多级菜单。\n' +
'\n' +
'`menus.vue`:\n' +
'\n' +
'```\n' +
'<template>\n' +
'  <el-submenu\n' +
'    :index="parentMenu.name"\n' +
'  >\n' +
'    <template slot="title">\n' +
'      <i\n' +
'        v-if="parentMenu.icon"\n' +
'        :class="parentMenu.icon"\n' +
'      />\n' +
'      <span slot="title">{{ parentMenu.title }}</span>\n' +
'    </template>\n' +
'\n' +
'    <template v-for="menu in parentMenu.children">\n' +
'      <el-menu-item\n' +
'        v-if="!menu.children"\n' +
'        :index="menu.path"\n' +
'        :key="menu.name"\n' +
'      >\n' +
'        <i\n' +
'          v-if="menu.icon"\n' +
'          :class="menu.icon"\n' +
'        />\n' +
'        <span slot="title">{{ menu.title }}</span>\n' +
'      </el-menu-item>\n' +
'\n' +
'      <menus\n' +
'        v-else\n' +
'        :key="menu.name"\n' +
'        :parent-menu="menu"\n' +
'      />\n' +
'    </template>\n' +
'  </el-submenu>\n' +
'</template>\n' +
'\n' +
'<script>\n' +
'    export default {\n' +
'        name: \'Menus\',\n' +
'        props: {\n' +
'            parentMenu: {\n' +
'                required: true,\n' +
'                type: Object\n' +
'            }\n' +
'        }\n' +
'    };\n' +
'</script>\n' +
'```\n' +
'\n' +
'另外，菜单数据如下，以便参考：\n' +
'```\n' +
'export default [\n' +
'    {\n' +
'        title: \'系统\',\n' +
'        name: \'SYSTEM\',\n' +
'        icon: \'el-icon-setting\',\n' +
'        children: [\n' +
'            {\n' +
'                title: \'用户管理\',\n' +
'                name: \'SYSTEM_USER\',\n' +
'                path: \'/system/user\'\n' +
'            },\n' +
'            {\n' +
'                title: \'角色管理\',\n' +
'                name: \'SYSTEM_ROLE\',\n' +
'                path: \'/system/role\'\n' +
'            },\n' +
'            {\n' +
'                title: \'菜单管理\',\n' +
'                name: \'SYSTEM_MENU\',\n' +
'                path: \'/system/menu\'\n' +
'            },\n' +
'            {\n' +
'                title: \'字典管理\',\n' +
'                name: \'DICT\',\n' +
'                children: [\n' +
'                    // {\n' +
'                    //     title: \'字典类型\',\n' +
'                    //     name: \'DICT_TYPE\',\n' +
'                    //     path: \'/dict/type\'\n' +
'                    // },\n' +
'                    {\n' +
'                        title: \'字典数据\',\n' +
'                        name: \'DICT_DATA\',\n' +
'                        path: \'/dict/data\'\n' +
'                    }\n' +
'                ]\n' +
'            }\n' +
'        ]\n' +
'    },\n' +
'    {\n' +
'        title: \'网站\',\n' +
'        name: \'SITES\',\n' +
'        icon: \'el-icon-menu\',\n' +
'        children: [\n' +
'            {\n' +
'                title: \'文章管理\',\n' +
'                name: \'SITES_ARTICLE\',\n' +
'                path: \'/sites/article\'\n' +
'            },\n' +
'            {\n' +
'                title: \'小说管理\',\n' +
'                name: \'SITES_NOVEL\',\n' +
'                path: \'/sites/novel\'\n' +
'            },\n' +
'            {\n' +
'                title: \'相册管理\',\n' +
'                name: \'SITES_ALBUM\',\n' +
'                path: \'/sites/album\'\n' +
'            },\n' +
'            {\n' +
'                title: \'视频管理\',\n' +
'                name: \'SITES_VIDEO\',\n' +
'                path: \'/sites/video\'\n' +
'            }\n' +
'        ]\n' +
'    },\n' +
'    {\n' +
'        title: \'修改密码\',\n' +
'        name: \'PASSWORD\',\n' +
'        icon: \'el-icon-lock\',\n' +
'        path: \'/password\'\n' +
'    }\n' +
'];\n' +
'```\n' +
'\n' +
'## 发现bug\n' +
'![](https://kangyonggan.com/web/upload/novel/eui.png)\n' +
'\n' +
'虽然控制台有报错，但是并不影响正常使用。\n' +
'\n' +
'经定位后发现是element-ui.common.js中有一行代码报错：\n' +
'```\n' +
'if (this.appendToBody) {\n' +
'    this.$parent.$el.dispatchEvent(new MouseEvent(\'mouseenter\'));\n' +
'}\n' +
'```\n' +
'\n' +
'经分析，原因是this.$parent并没有指向el-menu，因为我们使用组件递归时，给el-submenu外面多包了一层组件，因此这段代码在寻找父组件el-menu时就出问题了。\n' +
'\n' +
'## 解决方案\n' +
'改源码是不可能改源码的，既然是this.$parent.$el.dispatchEvent(new MouseEvent(\'mouseenter\'));报错，并且又不影响正常使用，那么可以断定这行代码是没用的，起码是对我这个项目没用。如果this.appendToBody等于false那不就完美了吗？\n' +
'\n' +
'继续追踪this.appendToBody的定义：\n' +
'\n' +
'```\n' +
'computed: {\n' +
'    // popper option\n' +
'    appendToBody: function appendToBody() {\n' +
'      return this.popperAppendToBody === undefined ? this.isFirstLevel : this.popperAppendToBody;\n' +
'    }\n' +
'}\n' +
'```\n' +
'发现如果this.popperAppendToBody 等于false的话，this.appendToBody就会等于false。\n' +
'\n' +
'继续追踪this.popperAppendToBody 的定义：\n' +
'\n' +
'```\n' +
'  name: \'ElSubmenu\',\n' +
'  props: {\n' +
'    index: {\n' +
'      type: String,\n' +
'      required: true\n' +
'    },\n' +
'    showTimeout: {\n' +
'      type: Number,\n' +
'      default: 300\n' +
'    },\n' +
'    hideTimeout: {\n' +
'      type: Number,\n' +
'      default: 300\n' +
'    },\n' +
'    popperClass: String,\n' +
'    disabled: Boolean,\n' +
'    popperAppendToBody: {\n' +
'      type: Boolean,\n' +
'      default: undefined\n' +
'    }\n' +
'  }\n' +
'```\n' +
'\n' +
'发现popperAppendToBody是el-subment的一个属性，但是这个属性在ElementUi官网上并没有列出，也不知道干啥用的，不看源码还真不知道。测试一下：\n' +
'\n' +
'```\n' +
'  <el-submenu\n' +
'    :index="parentMenu.name"\n' +
'    :popper-append-to-body="false"\n' +
'  >\n' +
'```\n' +
'\n' +
'解决问题！\n' +
'\n' +
'\n' +
'\n';